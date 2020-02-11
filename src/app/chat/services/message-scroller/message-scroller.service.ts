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
    }
  }

  public onMessageScrollBottom() {
    this.disableScrollDown = false;
    this.isAuthorMessage = true;
  }

  public checkIfOnBottom(el: ElementRef) {
    const atBottom = el.nativeElement.scrollHeight - el.nativeElement.scrollTop === el.nativeElement.clientHeight;
    if (atBottom) {
      return true;
    } else {
      return false;
    }
  }

  public disableAutoScroll() {
    this.disableScrollDown = true;
  }
}
