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

  submitted = false;
  public registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  // private area(): any {
  //   return this.fb.group({
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  ngOnInit(): void {
  this.registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}

onSubmit() {
  console.log(this.registrationForm.value);
}

}
