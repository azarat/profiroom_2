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

  collocutorRaiting = 4;
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

    console.log(this.collocutorData);

    this.chatService.getCollocutorInformation(this.collocutorData.collocutorId)
    .subscribe((res: any) => {

      this.collocutor = plainToClass(CollocutorInformationModel, res.user)
      console.log('colocutor', res)
      this.collocutorAllComments = this.commentsCountTransformerService.transformCommentsVlalue(this.collocutor.comments_count);
    })


  }



  // public transformCommentsVlalue(num: number) {
  //   if (num < 1000) {
  //     return num;
  //   } else {
  //     const exp = Math.floor(Math.log(num) / Math.log(1000));
  //     const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
  //     return (num / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1] + '+';
  //   }
  // }

  public showAllInfo() {
    this.isInformWraped = !this.isInformWraped;
    if(this.isInformWraped) {
      this.wrapButtonText = 'свернуть';
    } else {
      this.wrapButtonText = 'развернуть';
    }
  }
}
