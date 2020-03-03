import { Injectable } from '@angular/core';
// import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

// const config: SocketIoConfig = { url: 'http://192.168.0.200:6001', options: {} }

@Injectable()

export class ChatService {
  // currentRoom: string;

  // private connection: string;

  // messagesArray: any[];

  // tslint:disable-next-line: variable-name
  private _dealInfo = new BehaviorSubject(null);
  public dealInfo$ = this._dealInfo.asObservable();

  constructor(
    // private socket: Socket,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  sentMessage(msg: any, room: string | number, messageType: string, _chatType: string) {
    const userId = this.localStorageService.getItem('userId').value;
    return this.http.post('/message', { roomId: room, author: userId, message: msg, type: messageType, chatType: _chatType });
  }

  getPreviousMessages(roomId: string, messCount: number, chatType: string) {
    return this.http.get('/getRoomMessages?roomId=' + roomId + '&start=' + messCount + '&chatType=' + chatType);
  }
  // work_
  public getChatRooms(chatType: string) {
    return this.http.get('/getChat' + chatType + 'Rooms');
  }

  public getCollocutorInformation(id) {
    return this.http.get('/getChatUser?id=' + id);
  }

  // tslint:disable-next-line: variable-name
  public getUploadedFiles(_roomId) {
    return this.http.post('/getChatFiles', { roomId: _roomId });
  }

  public getBreef(_offerId) {
    return this.http.post('/getOfferBreef', { offer_id: _offerId });
  }

  // tslint:disable-next-line: variable-name
  public sendBreef(_deal_id: number, _answer: any) {
    return this.http.post('/setDealBreefAnswers', { deal_id: _deal_id, answers: JSON.stringify(_answer) });
  }

  public deleteDeal(_deal_id: number, ) {
    return this.http.post('/deleteDeal', { deal_id: _deal_id });
  }


  public getDealData(dealId: number) {
    return this.http.post('/getDeal', {deal_id: dealId  });
  }

  public approveBreef(dealId: number) {
    return this.http.post('/approveBreef', {deal_id: dealId });
  }

  public refuseBreef(dealId: number) {
    return this.http.post('/refuseBreef', {deal_id: dealId });
  }

  // hold money on deal

  public holdMoney(dealId: number) {
    return this.http.post('/holdmoney', {deal_id: dealId });
  }

  public startWork(dealId: number) {
    return this.http.post('/startWork', {deal_id: dealId });
  }

  public cencelWork(dealId: number) {
    return this.http.post('/cancelationDeal', {deal_id: dealId });
  }
  public submitDealCancel(dealId: number) {
    return this.http.post('/submitDealCancel', {deal_id: dealId });
  }

  public finishDeal(dealId: number) {
    return this.http.post('/finishDeal', {deal_id: dealId });
  }
  public submitFinishDeal(dealId: number) {
    return this.http.post('/submitDealFinish', {deal_id: dealId });
  }
  public cancelFinishDeal(dealId: number) {
    return this.http.post('/cancelFinishDeal', {deal_id: dealId });
  }


  public resetDealInfo(dealData) {
    this._dealInfo.next(null)
    setTimeout(() =>{
      this._dealInfo.next(dealData)
    }, 1000);
      this._dealInfo.next(dealData);

  }


}


