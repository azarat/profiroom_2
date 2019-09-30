import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false;
  public showPassword = false;
  public loginForm: FormGroup;
  hide = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checked: ['']
    });
  }


  authenticate(form: NgForm) {
    this.submitted = true;
    console.log(form.value);
    if (form.valid) {
      // do auth
      // this.router.navigateByUrl('/dashboard');
    } else {
      // error
    }
  }
}
