import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  NgForm,
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  User
} from 'src/app/models/user.model';
import {
  AuthService
} from 'src/app/core/services/auth.service';
import {
  Router
} from '@angular/router';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { LocalizeRouterService } from 'localize-router';

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
  message: InfoMessageInterface | boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checked: ['']
    });
  }


  authenticate() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.authenticate(this.loginForm.value)
      .subscribe(
        (data: User ) => {
          console.log(data);
          // this.localize.translateRoute('dashboard');
        },
        error => {
          console.log(error);
          this.message = {
            title: 'Ошибка',
            description: 'Не верно укзанные данные'
          };
        });
  }
}
