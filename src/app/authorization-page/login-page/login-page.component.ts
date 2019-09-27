import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthInterface } from '../shared/autorization.interface';
import { ShowHideInputDirective } from './show-hide-inputs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  public user: AuthInterface = null;
  submitted = false;
  public showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  @ViewChild(ShowHideInputDirective, { static: true }) input: ShowHideInputDirective;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {

  }
}
