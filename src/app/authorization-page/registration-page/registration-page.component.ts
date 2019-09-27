import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/core/validators/must-muth.validators';
import { AuthInterface } from '../shared/interfaces/autorization.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  public user: AuthInterface = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = { userId: null };

    this.registerForm = this.formBuilder.group({
      policy: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm);
    // this.authService.registration()
  }

}
