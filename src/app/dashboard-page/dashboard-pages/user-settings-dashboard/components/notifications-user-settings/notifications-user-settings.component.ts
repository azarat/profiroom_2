import { Component, OnInit, Input } from "@angular/core";
import { UserSettingsModel } from "src/app/models/user-settings.model";
import { UserSettingsService } from "../../services/user-settings.service";
import { filter } from "rxjs/operators";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-notifications-user-settings",
  templateUrl: "./notifications-user-settings.component.html",
  styleUrls: ["./notifications-user-settings.component.scss"]
})
export class NotificationsUserSettingsComponent implements OnInit {
  @Input() userSettingsModel: UserSettingsModel;
  public submited = false;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit() {
    if (this.userSettingsModel.userNotifications.notificationsAll === null) {
      this.userSettingsModel.userNotifications.notificationsAll = false;
    }
  }

  updateSettings( form: NgForm ) {
    this.userSettingsService.updateUserNotifications(form.value);
  }

  chouseAll() {
    if (this.userSettingsModel.userNotifications.notificationsAll) {
      for(let key in this.userSettingsModel.userNotifications) {
        if(key !== 'id' && key !== 'user_id' && key !== 'notificationsAll') {
          this.userSettingsModel.userNotifications[key] = true
        }
      }
      console.log(this.userSettingsModel.userNotifications);
    } else {
      for(let key in this.userSettingsModel.userNotifications) {
        if(key !== 'id' && key !== 'user_id' && key !== 'notificationsAll') {
          this.userSettingsModel.userNotifications[key] = false
        }
      }
    }
  }
}
