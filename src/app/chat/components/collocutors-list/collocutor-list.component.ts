import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../../core/services/socket.service';
import { plainToClass } from 'class-transformer';

//  Chat time converter

import { formatDataFunction } from 'src/app/shared/functions/format-data.function';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Howl, Howler } from 'howler';
import { CollocutorInterface } from '../../interfaces/collocutor.interface';
import { UserStateService } from 'src/app/dashboard-page/services/user-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { CollocutorService } from '../../services/collocutor.service';
import { DealService } from '../../services/deal.service';




const sound = new Howl({
  src: ['/assets/sounds/chat-messages/message.mp3']
});

@Component({
  selector: 'app-collocutor-list',
  templateUrl: './collocutor-list.component.html',
  styleUrls: ['./collocutor-list.component.scss']
})
export class CollocutorListComponent implements OnInit {

  public collocutors: CollocutorInterface[];
  public lastMessageDate: string;
  @Input() chatType: string;
  public userId: number | any;
  public currentFilterType = 'all';
  private newChatRoomData: {
    id: number,
    roomId: string;
  } = null;
  // @Output() currentRoom = new EventEmitter();

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private localStorageService: LocalStorageService,
    private userStateService: UserStateService,
    private route: ActivatedRoute,
    private router: Router,
    private localize: LocalizeRouterService,
    private collocutorService: CollocutorService,
    private dealService: DealService
  ) { }

  ngOnInit() {
    this.userId = this.localStorageService.getItem('userId').value;
    this._getChatRooms();
    
    this._subscribeNewMessages();
    this._checkUserState();
  }

  

  // Filter function
  public setCurrentType(event: any) {
    this.currentFilterType = event;
  }

  // Get list of collocutors
  private _getChatRooms() {
    this.chatService.getChatRooms(this.chatType)
    .subscribe((res: CollocutorInterface[]) => {
      // this.collocutors = res;
      this.collocutors = this._sortMessagesByTime(res);
      console.log('list', res)
      this._isAnyChatOpen();
    })
  }
//   private _getChatRooms() {
//     this.chatService.getChatRooms(this.chatType)
//       .subscribe((res: CollocutorInterface[]) => {
//         console.log(res)
//         this.collocutors = res;
//         this._sortMessagesByTime(this.collocutors);
//         this.openDealAfterBriefSubmit();
//         if(this.newChatRoomData && this.chatType === 'classic') {
//           let currentCollocutor = this._findChatRoom(+this.newChatRoomData.id)[0];
//           this._openChat(currentCollocutor);
//         }
//       });
//   }

//  Check querry params
private _isAnyChatOpen() {
  this.route.queryParams.subscribe((res: {offers_id?: any, dealId?: any, id?: any, roomId: string} | any) => {

    if(res.hasOwnProperty('offers_id') && this.chatType === 'work') {
      this._getDealData(res.id);
    }
    
    if(res.hasOwnProperty('dealId') && this.chatType === 'work') {
      // If Work chat
      this._getDealData(res.dealId);


    } else if(res.hasOwnProperty('id') && this.chatType === 'classic') {
      // Classic chat
      this._getCollocutorData(res.id);
    }

    this._connectToCurrentChatSocket(res.roomId);
  });
}


  private _connectToCurrentChatSocket(roomId) {
    this.socketService.openChat(roomId);
  }

  private _getCollocutorData(chatId) {
    // Find Active collocutor by chatId
    let currentCollocutor: any = this._findCurrentCollocutor(chatId)[0];
    console.log(currentCollocutor)
    this.chatService.getCollocutorInformation(currentCollocutor.collocutorId)
    .pipe(filter((res: any) => !! res))
    .subscribe((res: any) => {
      this.collocutorService.setCollocutorInfo(res.user);
    })
  }


  private _getDealData(dealId) {
    this.dealService.getDealData(dealId)
      .pipe(filter((res: any) => !! res))
      .subscribe((res: any)=> {
        console.log('NEWDATA', res)
        this.collocutorService.setCollocutorInfo(res);
      })
  }


  private _findCurrentCollocutor(id) {
        return this.collocutors.filter(el =>{
        return el.id === +id
      });
  }



  public openChat(collocutorData) {

    if(this.chatType === 'classic') {
        // clear router from params if click on anther chat
     let translatedPath = this.localize.translateRoute('/dashboard/chat-room');
      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {id: collocutorData.id, roomId: collocutorData.roomId},
      });

    } else if( this.chatType === 'work') {
      // clear router from params if click on anther deal
      let translatedPath = this.localize.translateRoute('/dashboard/projects');
      this.router.navigate([translatedPath], {
        relativeTo: this.route,
        queryParams: {dealId: collocutorData.id, roomId: collocutorData.roomId},
      });
    }
  }


  private _subscribeNewMessages() {
    this.socketService.showNewMessage()
      .subscribe(res => {
        this._pushNewMessage(this.collocutors, res);
        this._sortMessagesByTime(this.collocutors);
      });
  }















// // **** Get id of chatrooms or deals
//   private _getChatInformation() {  
//     this.route.queryParams.subscribe((res: any) => { 
//       if (res.hasOwnProperty('offers_id')) {
//         // If created new deal
//         console.log('new deal',res);
//         // this.collocutorData = res;
//         // this.getCurrentRoom(res);
//         this.getExistDeal(+res.id);

//       } else if (res.hasOwnProperty('dealId')) {
//         // If deal is already created
//         this.getExistDeal(+res.dealId);
//         // this._resetChat();
//       } else if(res.hasOwnProperty('id') && this.chatType=== 'classic') {
//         //  If classic chat and chat opened from user page
//         this.newChatRoomData = res;

//       }
//     });
//   }
// // Get Data of new deal
//   private getDealData(id: number) {

//     this.dealService.getDealData(id)
//     .pipe(filter((res: any) => !!res))
//     .subscribe((res: any) => {
//       console.log(res);
//       this.collocutorService.setCollocutorInfo(res);
//     })
//   }

//   // get exist Deal Data 

//   private getExistDeal(id: number) {
//     this.dealService.getDealData(id)
//     .subscribe((res: any)=> {
//       console.log('NEWDATA', res)
//       this.collocutorService.setCollocutorInfo(res);
//     })
//   }
//   // Find current collocutor in list
//   private _findChatRoom(id: number) {
//     return this.collocutors.filter(el =>{
//       return el.id === id
//     });
//   }

//  If user role changed
  private _checkUserState() {
    this.userStateService.userState$
      .subscribe(res => {
        this._getChatRooms();
      });
  }



// // Reset route from querryParams
//   public openChat(userInfo) {
//     this._openChat(userInfo);
//   let translatedPath: any;
//     if (this.chatType === 'work') {
//       // clear router from params if click on anther deal
//       translatedPath = this.localize.translateRoute('/dashboard/projects');
//       this.router.navigate([translatedPath], {
//         relativeTo: this.route,
//         queryParams: {dealId: userInfo.id},
//       });
//     } else if(this.chatType === 'classic') {
//       // clear router from params if click on anther chat
//       translatedPath = this.localize.translateRoute('/dashboard/chat-room');
//       this.router.navigate([translatedPath], {
//         relativeTo: this.route,
//         queryParams: {id: userInfo.id},
//       });
//     }
 
//   }

//   //  separate function to connect chatRoom
//   private _openChat(userInfo) {
//     // this.collocutorService.setCollocutorInfo(null);
//     // setTimeout(()=> {
    
//     // }, 100)
//     // this.collocutorService.setCollocutorInfo(userInfo);
//     // console.log('userInfo', userInfo);
//     // this.currentRoom.emit(userInfo);
//     this.socketService.openChat(userInfo.roomId);
    
//   }

  private _pushNewMessage(arr, obj: any) {
    if (arr.length !== 0) {
      const foundIndex = arr.findIndex(x => x.roomId === obj.roomId);
      this.collocutors[foundIndex] = obj;
    } else {
      this.collocutors.push(obj);
    }
    if (+(obj.message[0].author) !== this.userId && obj.unread !== 0) {
      sound.play();
    }

  }

// Sort Messages new on top
  private _sortMessagesByTime(arr) {
    const x = arr.sort((a, b) => {
      const filedAOrder = a.message.length === 0 ? a.created_at : a.message[0].dateTime;
      const filedBOrder = b.message.length === 0 ? b.created_at : b.message[0].dateTime;
      return filedBOrder.localeCompare(filedAOrder);
    });
    // this.collocutors = x;
    return x;
  }

//   //  open deal After brief submitting

//   private openDealAfterBriefSubmit() {
//     this.route.queryParams
//       .pipe(
//         filter((res: any) => !!res),
//       )
//       .subscribe((res: any) => {
//         if (res.hasOwnProperty('dealId')) {
//           // let dealId = Number(res.dealId);
//           const activeDeal = this.collocutors.find(collocutor => collocutor.id === +res.dealId);
//           this._openChat(activeDeal);
//         }

//       });
//   }


}
