import { Injectable, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()

export class MessageScrollerService {

  disableScrollDown = false;
  // isWrittenMessage$ = new Subject<any>();
  isAuthorMessage = false;

  constructor() { }

  public onScroll(messWrap: ElementRef) {
    const el = messWrap;
    // Check is chat scrolled to bottom
    const atBottom = el.nativeElement.scrollHeight - el.nativeElement.scrollTop === el.nativeElement.clientHeight;

    if (this.isAuthorMessage && !atBottom) {
      this.disableScrollDown = false;
    } else if (this.isAuthorMessage && atBottom) {
      this.isAuthorMessage = false;
    } else if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false;
    } else if (!this.isAuthorMessage && !this.disableScrollDown) {
      this.disableScrollDown = true;
    }

  }

  public scrollToBottom(messWrap: ElementRef): void {
    const el = messWrap;

    if (this.disableScrollDown && !this.isAuthorMessage) {
      return;
    }
    try {
      el.nativeElement.scrollTop = el.nativeElement.scrollHeight + 210;
    } catch (err) {
      console.log('err', err);
    }
  }

  public onMessageScrollBottom() {
    this.disableScrollDown = false;
    this.isAuthorMessage = true;
  }

  // getMessaglistProperty(): Observable<any> {
  //   return this.isWrittenMessage$.asObservable();
  // }
}
