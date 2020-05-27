import {
  NgModule,
  Injectable
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  HomeUserSettingsComponent
} from './components/home-user-settings.component';
import {
  Routes,
  RouterModule,
  CanDeactivate
} from '@angular/router';
import {
  LocalizeRouterModule
} from 'localize-router';
import {
  MatTabsModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  NgxMaskModule,
  IConfig
} from 'ngx-mask';
import {
  NgKnifeModule
} from 'ng-knife';
import {
  Observable
} from 'rxjs';

// tslint:disable-next-line: max-line-length
import {
  GeneralUserSettingsComponent
} from './components/general-user-settings/general-user-settings.component';
import {
  MainUserSettingsComponent
} from './components/general-user-settings/main-user-settings/main-user-settings.component';
import {
  BirthdayUserSettingsComponent
} from './components/general-user-settings/birthday-user-settings/birthday-user-settings.component';
import {
  LocationLanguageUserSettingsComponent
} from './components/general-user-settings/location-language-user-settings/location-language-user-settings.component';
import {
  EducationUserSettingsComponent
} from './components/general-user-settings/education-user-settings/education-user-settings.component';
import {
  AdditionalEducationUserSettingsComponent
} from './components/general-user-settings/additional-education-user-settings/additional-education-user-settings.component';
import {
  NotificationsUserSettingsComponent
} from './components/notifications-user-settings/notifications-user-settings.component';

import {
  SecurityUserSettingsComponent
} from './components/security-user-settings/security-user-settings.component';
import {
  SecurityPassUserSettingsComponent
} from './components/security-user-settings/security-pass-user-settings/security-pass-user-settings.component';
import {
  SecurityMailUserSettingsComponent
} from './components/security-user-settings/security-mail-user-settings/security-mail-user-settings.component';
import {
  TranslateModule
} from '@ngx-translate/core';
import { MonthPipeModule } from 'src/app/shared/pipes/month-pipe/month-pipe.module';


// ------- guard functional -------

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable < boolean > ;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate < ComponentCanDeactivate > {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable < boolean > {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate() ?
      true :
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355 ?
      // confirm('WARNING: 1 You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
      confirm('Вы уверены, что хотите выйти. У вас есть несохраненные изменения. Нажмите Отмена, чтобы вернуться и сохранить эти изменения, или OK, чтобы потерять эти изменения.');
  }
}

const options: Partial < IConfig > | (() => Partial < IConfig > ) = {};

const servicesRoutes: Routes = [{
    path: '',
    component: HomeUserSettingsComponent,
    canDeactivate: [PendingChangesGuard]
  },

];

@NgModule({
  declarations: [
    HomeUserSettingsComponent,
    GeneralUserSettingsComponent,
    MainUserSettingsComponent,
    BirthdayUserSettingsComponent,
    LocationLanguageUserSettingsComponent,
    EducationUserSettingsComponent,
    AdditionalEducationUserSettingsComponent,
    NotificationsUserSettingsComponent,


    SecurityUserSettingsComponent,
    SecurityPassUserSettingsComponent,
    SecurityMailUserSettingsComponent,
  ],
  imports: [
    CommonModule,
    LocalizeRouterModule.forChild(servicesRoutes),
    RouterModule.forChild(servicesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgKnifeModule,
    TranslateModule,
    // -----matherials
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    NgxMaskModule.forRoot(options),

     // pipes
     MonthPipeModule,
  ],
  providers: [PendingChangesGuard],
})
export class UserSettingsDashboardModule {}
