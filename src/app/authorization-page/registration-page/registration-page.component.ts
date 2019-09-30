import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  MustMatch
} from 'src/app/core/validators/must-muth.validators';
import {
  AuthService
} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) {}

  submitted = false;
  public registrationForm: FormGroup;
  hideF = true;
  hideS = true;
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

  // private area(): any {
  //   return this.fb.group({
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreed: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, {
      validator: RegistrationPageComponent.passwordMatchValidator
    });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }

}
