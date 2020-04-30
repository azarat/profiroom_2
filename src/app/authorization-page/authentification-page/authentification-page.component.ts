import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-authentification-page',
  templateUrl: './authentification-page.component.html',
  styleUrls: ['./authentification-page.component.scss']
})
export class AuthentificationPageComponent implements OnInit {

  public auth = false;
  public message: InfoMessageInterface | boolean;
  public year = new Date().getFullYear();

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private authService: AuthentificationService,
    private titleService: Title
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
                title: 'Email подтвержден',
                description: 'Теперь можете войти в личный кабинет'
              };
            }
          });

      }
    });
  }
  

  ngOnInit() {
    this.titleService.setTitle('Авторизация')
  }
  swipeBtn() {
      this.auth = !this.auth;
  }
  // varifyEmail( expires, id, signature) {


  // }

}
