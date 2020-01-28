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
      this.userSettingsModel.userNotifications.privateMessages = true;
      this.userSettingsModel.userNotifications.newOrders = true;
      this.userSettingsModel.userNotifications.serviceNotifications = true;
      this.userSettingsModel.userNotifications.messagesActiveProject = true;
      this.userSettingsModel.userNotifications.reservationFinancial = true;
      this.userSettingsModel.userNotifications.deadlines = true;
      this.userSettingsModel.userNotifications.orderFeedback = true;
    } else {
      this.userSettingsModel.userNotifications.privateMessages = false;
      this.userSettingsModel.userNotifications.newOrders = false;
      this.userSettingsModel.userNotifications.serviceNotifications = false;
      this.userSettingsModel.userNotifications.messagesActiveProject = false;
      this.userSettingsModel.userNotifications.reservationFinancial = false;
      this.userSettingsModel.userNotifications.deadlines = false;
      this.userSettingsModel.userNotifications.orderFeedback = false;
    }
  }
}
