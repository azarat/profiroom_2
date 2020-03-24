import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CollocutorInformationModel } from 'src/app/models/chat/collocutor-information.model';
import { plainToClass } from 'class-transformer';
import { CommetnsCountTransformerService } from 'src/app/core/services/comments-count-transformer.service';

const n = 5750;

@Component({
  selector: 'app-collocutor-information',
  templateUrl: './collocutor-information.component.html',
  styleUrls: ['./collocutor-information.component.scss']
})
export class CollocutorInformationComponent implements OnInit {

  // collocutorRaiting = 4;
  public collocutorAllComments = null;
  public isInformWraped: boolean = false;
  public wrapButtonText: string = 'развернуть';

  @Input() collocutorData;
  public collocutor;
  constructor(
    private chatService: ChatService,
    private commentsCountTransformerService: CommetnsCountTransformerService
  ) { }

  ngOnInit() {
    this.chatService.getCollocutorInformation(this.collocutorData.collocutorId)
    .subscribe((res: any) => {

      this.collocutor = plainToClass(CollocutorInformationModel, res.user)
      this.collocutorAllComments = this.commentsCountTransformerService.transformCommentsVlalue(this.collocutor.comments_count);
    });
  }

  public showAllInfo() {
    this.isInformWraped = !this.isInformWraped;
    this.wrapButtonText = this.isInformWraped === true ? 'свернуть' : 'развернуть';
  }
}
