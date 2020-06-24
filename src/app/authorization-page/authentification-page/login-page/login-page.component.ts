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
  AuthentificationService
} from 'src/app/core/services/auth.service';
import {
  Router
} from '@angular/router';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { LocalizeRouterService } from 'localize-router';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public submitted: boolean = false;
  public showPassword: boolean = false;
  public loginForm: FormGroup;
  public hide: boolean = true;
  public message: InfoMessageInterface | boolean;

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService,
    private localStorageService: LocalStorageService,
    private localize: LocalizeRouterService,
    private router: Router,
    // private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      foreignComp: [null]
    });
  }


  authenticate() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authentificationService.authenticate(this.loginForm.value)
      .subscribe(
        (data: UserModel | any) => {
          if (data !== null) {
            if (data === 'not verifired') {
              this.message = {
                title: 'auth-page.sys-messages.submit-registration',
                // tslint:disable-next-line:max-line-length
                description: 'auth-page.sys-messages.submit-registration-text'
              };
            } else {
              const translatedPath: any = this.localize.translateRoute('/dashboard');
              this.localStorageService.setItem('token', data.token);
              this.router.navigate([translatedPath]);
            }
          }
          console.log(data);
        },
        error => {

          if (error === 'Forbidden') {
            this.message = {
              title: 'auth-page.sys-messages.finish-registration',
              // tslint:disable-next-line:max-line-length
              description: 'auth-page.sys-messages.finish-registration-text'
            };
          } else if(error === 'Bad Request') {
            this.message = {
              title: 'auth-page.sys-messages.erorr-message-title',
              description: 'auth-page.sys-messages.wrong-data'
            };
          }
        });

  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
}
