import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';

@Component({
  selector: 'app-authentification-page',
  templateUrl: './authentification-page.component.html',
  styleUrls: ['./authentification-page.component.scss']
})
export class AuthentificationPageComponent implements OnInit {

  auth = false;
  message: InfoMessageInterface | boolean;
  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private authService: AuthentificationService
  ) {
    this._route.queryParams.subscribe(data => {
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
  year = new Date().getFullYear();
  ngOnInit() {
  }
  swipeBtn() {
      this.auth = !this.auth;
  }
  // varifyEmail( expires, id, signature) {


  // }

}
