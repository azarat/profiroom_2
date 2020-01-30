import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { CustomValidators, RegistrationPageComponent } from '../authentification-page/registration-page/registration-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-set-new-pass',
  templateUrl: './set-new-pass.component.html',
  styleUrls: ['./set-new-pass.component.scss']
})
export class SetNewPassComponent implements OnInit {
  token: string = null;
  email: string = null;
  routeAuthPage: any = this.localize.translateRoute('/auth');
  constructor(
    private fb: FormBuilder,
    private autServ: AuthentificationService,
    private router: Router,
    private authService: AuthentificationService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private localize: LocalizeRouterService,
  ) {
    this._route.queryParams.subscribe(data => {
      if (data.token !== undefined) {
        this.token = data.token;
        this.email = data.email;
      } else {
        const redirectToAuthPath: any = this.localize.translateRoute('/dashboard');
        this.router.navigate([redirectToAuthPath]);
      }
    });
  }

  submitted = false;
  public registrationForm: FormGroup;
  hideF = true;
  hideS = true;
  message: InfoMessageInterface | boolean;


  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('password_confirmation').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password_confirmation').setErrors({
        NoPassswordMatch: true
      });
    }
  }


  ngOnInit(): void {
    this.initializeForm();
  }

  registrate() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.autServ.confirmNewPass(this.registrationForm.value)
      .subscribe(res => {
        if (res.message === 'This password reset token is invalid.') {
          this.message = {
            title: 'Ошибка',
            description: 'Время сессии истекло'
          };

        } else {
          this.message = {
            title: 'Смена успешна',
            description: 'Можете войти используя новый пароль'
          };
          setTimeout(() => {
            this.router.navigate([this.routeAuthPage]);
          }, 3000);

        }
      },
        erorr => {
          this.message = {
            title: 'Ошибка',
            description: 'Время сессии истекло'
          };
        }
      );
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      token: [this.token, Validators.required],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,

        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // // 5. check whether the entered password has a special character
        // tslint:disable-next-line: max-line-length
        CustomValidators.patternValidator(/^(?=.*[!@#\$%\^&\*])/, { hasSpecialCharacters: true }),
        // 6.; Has; a; minimum; length; of; 8; characters;  (?=.{6,100})
        CustomValidators.patternValidator(/(?=.{8,100})/, { minLengthCharacters: true })])
      ],
      password_confirmation: [null, Validators.required]
    }, {
      validator: RegistrationPageComponent.passwordMatchValidator
    });
  }

}




