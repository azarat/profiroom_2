import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class SystemMessagesService {

  constructor(
    private http: HttpClient
  ) { }

  public systemMessagesList() {
    return this.http.get('/bellNotice');
  }

  public deleteSystemMessage(messageID) {
    if (messageID !== 0) {
      return this.http.post('/deleteBellNotice', {noticeId: messageID});
    } else {
      return this.http.post('/deleteBellNotice', {all: true});
    }
  }

}
