import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../../core/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { CollocutorService } from '../../services/collocutor.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HammerGestureConfig } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() chatType: string;

  uploadedBriefFiles: any;

  public collocutorData: CollocutorInterface = null;
  public isFileLoaderVisible: boolean = null;
  // var if exit from unWritten brief
  public exitFromBriefPopUpVisible: boolean = null;
  public isChat = true;
  public moneyRequired = null;
  public rightBarInit: boolean = null; // true on window width < 1024px
  public leftBarInit: boolean = null; // true on window width < 1024px


  public rightBarVisible: boolean = false;
  public leftBarVisible: boolean = false;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private userStateService: UserStateService,
    private collocutorService: CollocutorService
  ) { }

  ngOnInit() {
    this.getDealData();
    // this.subscribeCollocutorList();
    this._dealUpdating();
  }
  ngOnDestroy(): void {
    this.socketService.closeCollocutorSocket(this.chatType);
    this.collocutorService.setCollocutorInfo(null);
  }



  /*
    **
    Reset messager path after brief filling
    **
  */
  public resetChat() {
    this._resetChat();
  }


  private _resetChat() {
    this.isChat = null;
    setTimeout(() => {
      this.isChat = true;
    }, 100);
  }

  /*
   subscribe on collucutor/ deal data
  */

  private getDealData() {
    this.collocutorService.collocutorData$
    .pipe(untilDestroyed(this))
    .subscribe(res => {
      this.collocutorData = res;
    });
  }

  private _dealUpdating() {
    this.socketService.dealUpdating()
    .subscribe((res: any) => {
      if(this.collocutorData.id === res.id) {

        this.collocutorService.setCollocutorInfo(res);
      }

    });
  }

  public openPayment(e) {
    this.moneyRequired = e;
  }


  public swipeEvent(event: any) {
    console.log(event)
    if (event.type === 'swipeleft') {

      // if(window.innerWidth > 768) {

        if (this.rightBarVisible === null || this.rightBarVisible === false) {
          this.rightBarVisible = true;
        }
      // } else if (window.innerWidth < 768) {

      // }


    } else if (event.type === 'swiperight') {
      if (this.rightBarVisible === true) {
        this.rightBarVisible = false;
      }
    }
  }

  public showRightBar() {
    if (this.rightBarVisible === null) {
      this.rightBarVisible = true;
    } else {
      this.rightBarVisible = !this.rightBarVisible;
    }
  }

  public showLeftBar() {
    if (this.leftBarVisible === null) {
      this.leftBarVisible = true;
      this.rightBarVisible = false;
    } else {
      this.leftBarVisible = !this.leftBarVisible;
    }
  }

  public hideRightBar() {
    this.rightBarVisible = false;
  }

  public hidLeftBar() {
    this.leftBarVisible = false;
  }

  toggleCollocutorsTools() {
    if(this.rightBarVisible){
      this.rightBarVisible = !this.rightBarVisible;
    }
    this.leftBarVisible = !this.leftBarVisible;
  }
  toggleCollocutorsInfo() {
    if(this.leftBarVisible){
      this.leftBarVisible = !this.leftBarVisible;
    }
    this.rightBarVisible = !this.rightBarVisible;
  }
  swipeDirectionFromMessage(evnt){
    console.log('swipeDirectionFromMessage ' + evnt);
  }

}
