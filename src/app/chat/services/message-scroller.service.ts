import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class MessageScrollerService {

  disableScrollDown = false;

  constructor() { }

  public onScroll(messWrap: ElementRef) {
    let element = messWrap.nativeElement;
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }

  public scrollToBottom(messWrap: ElementRef): void {
    console.log(this.disableScrollDown);
    if (this.disableScrollDown) {
      console.log('scroll');
      this.disableScrollDown = false;
      return;
    } else {
      messWrap.nativeElement.scrollTop = messWrap.nativeElement.scrollHeight;
      return;
    }
    // try {

      // this.disableScrollDown = false;
    // } catch (err) {
    //   console.log('err', err)
    // }
  }
}
