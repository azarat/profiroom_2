import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { InfoMessageInterface } from 'src/app/shared/interfaces/info-message.interface';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-authentification-page',
  templateUrl: './authentification-page.component.html',
  styleUrls: ['./authentification-page.component.scss']
})
export class AuthentificationPageComponent implements OnInit {

  public auth = false;
  public message: InfoMessageInterface | boolean;
  public year = new Date().getFullYear();
  public animation: boolean = null;
  public animationType: string = null;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private authService: AuthentificationService,
    private titleService: Title,
    private metaTagService: Meta
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
    this.titleService.setTitle('Авторизация');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Биржа удаленных работников для найма фрилансеров быстро, недорого, выполнение работы качественно и в срок. Найдите своего идеального фриансера!' }
    );
  }
  swipeBtn() {
      this.auth = !this.auth;
      if (this.animation === true) {
        return;
      }
      this.animation = true;
      this.animationType = 'forvard';
      setTimeout(() => {
        this.animation = null;
      }, 8000);

      setTimeout(() => {
        this.animationType = 'back';
      }, 4000);
  }
  // varifyEmail( expires, id, signature) {


  // }

}
