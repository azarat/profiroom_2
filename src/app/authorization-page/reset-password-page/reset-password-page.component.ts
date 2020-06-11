import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  public resetPass: FormGroup = null;
  submitted = false;
  message: InfoMessageInterface | boolean;
  public currentLanguage: string = null;

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService,
    private localStorageService: LocalStorageService,
    private localize: LocalizeRouterService
  ) { }

  ngOnInit() {
    this.getCurrentLang();

    this.resetPass = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
      currentLang: this.currentLanguage
    });
  }

  public getCurrentLang() {
    const changedLang = this.localStorageService.getItem('userLanguage');
    const defaultLanguage = this.localize.parser.getLocationLang().toString();
   
    this.currentLanguage = changedLang === null ? defaultLanguage : changedLang.value.toString()

  }

  ResetPass() {
    this.submitted = true;
    if (this.resetPass.invalid) {
      return;

    }
    this.authentificationService.resetPass(this.resetPass.value).subscribe(
      res => {
      this.message = {
        title: 'auth-page.sys-messages.request-succes',
        description: 'auth-page.sys-messages.submit-password-email'
      };
    },
    erorr => {
      this.message = {
        title: 'auth-page.sys-messages.erorr-message-title',
        description: 'auth-page.sys-messages.not-registred-email'
      };
    });
  }
}
