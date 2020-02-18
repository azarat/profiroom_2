import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollucutorsListInterface } from '../../interfaces/collucotors-list.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-project-breef-filling',
  templateUrl: './project-breef-filling.component.html',
  styleUrls: ['./project-breef-filling.component.scss']
})
export class ProjectBreefFillingComponent implements OnInit {

  @Input() collocutorData: CollucutorsListInterface;
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();

  constructor(
    private chatSerrvice: ChatService
  ) { }

  ngOnInit() {
    console.log(this.collocutorData);
    this.getOffer();
  }

  getOffer() {
    this.chatSerrvice.getBreef(+this.collocutorData.offers_id)
      .subscribe(res => {
        console.log(res);
      });
  }

  // open file uploader
  public openFilesUploader() {
    this.isFileLoaderVisibleChange.emit(true);
  }
}
