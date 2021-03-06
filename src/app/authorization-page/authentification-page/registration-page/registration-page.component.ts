import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import {
  MustMatch
} from 'src/app/core/validators/must-muth.validators';
import {
  AuthentificationService
} from 'src/app/core/services/auth.service';
import {
  map
} from 'rxjs/operators';
import {
  InfoMessageInterface
} from 'src/app/shared/interfaces/info-message.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalizeRouterService } from 'localize-router';

export class CustomValidators {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
   submitted = false;
    public registrationForm: FormGroup;
    hideF = true;
    hideS = true;
    message: InfoMessageInterface | boolean;
    currentLanguage: string = null;

  constructor(
    private fb: FormBuilder,
    private autServ: AuthentificationService,
    private localStorageService: LocalStorageService,
    private localize: LocalizeRouterService
  ) { }

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
    
    this.getCurrentLang();
    
  }
  public getCurrentLang() {
    const changedLang: any = localStorage.getItem('userLanguage');
    const defaultLanguage = this.localize.parser.getLocationLang();
   console.log(defaultLanguage, changedLang )
    this.currentLanguage = changedLang === null ? defaultLanguage : changedLang;
    this.initializeForm();
  }
 

  registrate() {

    if (this.registrationForm.invalid) {
      return;
    }
    this.submitted = true;
    this.autServ.registation(this.registrationForm.value)
      .subscribe(res => {
        this.message = {
          title: 'auth-page.sys-messages.register-succes',
          description: 'auth-page.sys-messages.succes-text'
        };
      },
        erorr => {
          this.message = {
            title: 'auth-page.sys-messages.erorr-message-title',
            description: 'auth-page.sys-messages.mail-already-exist'
          };
        }
      );
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
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
        CustomValidators.patternValidator( /^(?=.*[!@#\$%\^&\*])/, { hasSpecialCharacters: true }),
        // 6.; Has; a; minimum; length; of; 8; characters;  (?=.{6,100})
        CustomValidators.patternValidator(/(?=.{8,100})/, { minLengthCharacters: true })])
  ],
      agreed: [null, [Validators.required]],
      currentLang: this.currentLanguage,
      password_confirmation: [null, Validators.required]
    }, {
      validator: RegistrationPageComponent.passwordMatchValidator
    });
  }


}

