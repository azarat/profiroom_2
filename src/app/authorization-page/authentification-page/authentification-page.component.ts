import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-authentification-page',
  templateUrl: './authentification-page.component.html',
  styleUrls: ['./authentification-page.component.scss']
})
export class AuthentificationPageComponent implements OnInit {

  public auth = false;
  public message: InfoMessageInterface | boolean;
  public year = new Date().getFullYear();
  public currentLanguage: string = null;
  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private authService: AuthentificationService,
    private titleService: Title,
    private localStorageService: LocalStorageService,
    private localize: LocalizeRouterService
  ) {
    this._route.queryParams.subscribe(data => {
      if (data.type) {
        data.type === 'signup' ? this.auth = true : this.auth = false;
      }
      if (data.id) {
        this.authService.verifyEmail(data.id, data.expires, data.signature)
          .subscribe(data => {
            if (data === 'Email verified!' ) {
              this.message = {
                title: 'auth-page.sys-messages.email-werifired',
                description: 'auth-page.sys-messages.email-werifired-description'
              };
            }
          });

      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Авторизация')
    // this.getCurrentLang();
  }

  // public getCurrentLang() {
  //   const changedLang: any = localStorage.getItem('userLanguage');
  //   const defaultLanguage = this.localize.parser.getLocationLang();
  //  console.log(defaultLanguage, changedLang )
  //   this.currentLanguage = changedLang === null ? defaultLanguage : changedLang;

  // }


  swipeBtn() {
      this.auth = !this.auth;
  }
  // varifyEmail( expires, id, signature) {


  // }

}
