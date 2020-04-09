import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemMessagesService {

  constructor(
    private http: HttpClient,
  ) { }

  public systemMessagesList() {
    return this.http.get('/bellNotiys')
  }

  public deleteSystemMessage(messageID) {
    if(messageID !== 0) {
      return this.http.post('/deleteBellNotiy', {notiyId: messageID})
    } else {
      return this.http.post('/deleteBellNotiy', {all: true})
    }
    
  }
}
