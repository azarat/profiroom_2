import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CollocutorInformationModel } from 'src/app/models/chat/collocutor-information.model';
import { plainToClass } from 'class-transformer';
import { CommentsCountTransformerService } from 'src/app/core/services/comments-count-transformer.service';
import { CollocutorService } from '../../services/collocutor.service';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';

const n = 5750;

@Component({
  selector: 'app-collocutor-information',
  templateUrl: './collocutor-information.component.html',
  styleUrls: ['./collocutor-information.component.scss']
})
export class CollocutorInformationComponent implements OnInit {

  // collocutorRating = 4;
  public collocutorAllComments = null;
  public isInformWrapped: boolean = false;
  public wrapButtonText: string = 'развернуть';

  public collocutorData: CollocutorInterface;
  constructor(
    private chatService: ChatService,
    private commentsCountTransformerService: CommentsCountTransformerService,
    private collocutorService: CollocutorService
  ) { }

  ngOnInit() {
    // this.chatService.getCollocutorInformation(this.collocutorData.collocutorId)
    // .subscribe((res: any) => {

    //   this.collocutor = plainToClass(CollocutorInformationModel, res.user)
    //   this.collocutorAllComments = this.commentsCountTransformerService.transformCommentsValue(this.collocutor.negative_comments_count + this.collocutor.positive_comments_count );
    // });
    this.getCollocutorData();
  }

  private getCollocutorData() {
    this.collocutorService.collocutorData$
    .subscribe(res => {
      this.collocutorData = res;
      this.collocutorAllComments = this.commentsCountTransformerService.transformCommentsValue(this.collocutorData.negative_comments_count + this.collocutorData.positive_comments_count );
    });
  }

  public showAllInfo() {
    this.isInformWrapped = !this.isInformWrapped;
    this.wrapButtonText = this.isInformWrapped === true ? 'свернуть' : 'развернуть';
  }
}
