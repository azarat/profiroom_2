import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm
} from '@angular/forms';
import {
  MustMatch
} from 'src/app/core/validators/must-muth.validators';
import {
  AuthService
} from 'src/app/core/services/auth.service';
import {
  map
} from 'rxjs/operators';
import {
  InfoMessageInterface
} from 'src/app/shared/interfaces/info-message.interface';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private autServ: AuthService
  ) {}

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
    this.autServ.registation(this.registrationForm.value)
      .subscribe(res => {
          console.log(res);
          this.registrationForm.reset();
          this.message = {
            title: 'Регистрация успешна',
            description: 'На указанную Вами почту придёт письмо с подтверждением регистрации.'
          };
        },
        erorr => {
          this.message = {
            title: 'Ошибка',
            description: 'Этот Email уже зарегистрирован'
          };
        }
        );
  }

  initializeForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreed: ['', [Validators.required]],
      password_confirmation: ['', Validators.required]
    }, {
      validator: RegistrationPageComponent.passwordMatchValidator
    });
  }

}
