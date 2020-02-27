import { Component, OnInit, Input } from '@angular/core';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-messager-tools',
  templateUrl: './messager-tools.component.html',
  styleUrls: ['./messager-tools.component.scss']
})
export class MessagerToolsComponent implements OnInit {

  @Input() collocutorData: CollucutorsListInterface;
  packagePrice: string;
  deal = null;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.convertPackagePrice();
    this.getDeal();
  }


  private convertPackagePrice() {
    this.packagePrice = this.collocutorData.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getDeal() {
    this.chatService.getDealData(this.collocutorData.id)
    .subscribe(res => {
      this.deal = res;
      console.log('Deal',res);
    })
  }
}
