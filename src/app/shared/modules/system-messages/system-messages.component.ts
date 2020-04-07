import { Component, OnInit, Input } from '@angular/core';
import { SystemMessagesService } from 'src/app/core/services/system-messages.service';
import { UserModel } from 'src/app/models/user.model';


@Component({
  selector: 'app-system-messages',
  templateUrl: './system-messages.component.html',
  styleUrls: ['./system-messages.component.scss']
})
export class SystemMessagesComponent implements OnInit {

  @Input() user: UserModel;
  public showMessagesList = false;
  public systemMessagesArr;

  constructor(
    private systemMessagesService: SystemMessagesService
  ) { }

  ngOnInit() {
    console.log(this.user);

    this.systemMessagesService.systemMessagesList(this.user.id)
    .subscribe(res => {
      this.systemMessagesArr = res;
      console.log(this.systemMessagesArr);
    });
  }

  public toggleMessageList() {
    this.showMessagesList = !this.showMessagesList;
  }
}
