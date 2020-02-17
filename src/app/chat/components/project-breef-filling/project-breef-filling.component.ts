import { Component, OnInit, Input } from '@angular/core';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-project-breef-filling',
  templateUrl: './project-breef-filling.component.html',
  styleUrls: ['./project-breef-filling.component.scss']
})
export class ProjectBreefFillingComponent implements OnInit {

  @Input() dealId: {
    dealRoom: number,
    offerId: number
  };
  @Input() collocutorData: CollucutorsListInterface;

  constructor(
    private chatSerrvice: ChatService
  ) { }

  ngOnInit() {
    console.log(this.dealId);
    this.getOffer();
  }

  getOffer() {
    this.chatSerrvice.getBreef(this.dealId.offerId)
      .subscribe(res => {
        console.log(res);
      });
  }
}
