import { Component, OnInit, HostListener } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserSettingsService } from '../services/user-settings.service';
import { Title } from '@angular/platform-browser';
import { ComponentCanDeactivate } from '../user-settings-dashboard.module';
import { Observable } from 'rxjs/internal/Observable';
import cloneDeep from 'lodash/clonedeep';
import isEqual from 'lodash/isEqual';


@Component({
  selector: 'app-user-settings-dashboard',
  templateUrl: './home-user-settings.component.html',
  styleUrls: ['./home-user-settings.component.scss']
})
export class HomeUserSettingsComponent implements OnInit, ComponentCanDeactivate {

  public userSettingsModel: UserSettingsModel = null;
  private onloadUserModelCopy: UserSettingsModel = null;

  constructor(
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private userSettingsService: UserSettingsService,
    private titleService: Title
  ) { }

  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm alert before navigating away
    
    if(isEqual(this.onloadUserModelCopy, this.userSettingsModel)) {
      return true
    }
    return false
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
        $event.returnValue = "Вы уверены, что хотите выйти. У вас есть несохраненные изменения. Нажмите Отмена, чтобы вернуться и сохранить эти изменения, или OK, чтобы потерять эти изменения.";
    }
  }

  ngOnInit() {
    this.getUserService();

    this.userSettingsService.onloadUserModelCopy$.subscribe((res: UserSettingsModel) => {
      this.onloadUserModelCopy = res;
    });
    
    this.titleService.setTitle('Настройки');
    
  }

  //  ** load userServiceData from server
  getUserService() {
    let request: object;
    if (this._route.snapshot.queryParams.offerId) {
      request = this._route.snapshot.queryParams;
    }
    this.userSettingsService.getServiceData()
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {
        this.userSettingsModel = plainToClass(UserSettingsModel, response);
        this.userSettingsService.onloadUserModelCopy$.next(cloneDeep(this.userSettingsModel));
      });
  }



}
