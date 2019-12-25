import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

declare var $: any;

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss']
})
export class MessagerComponent implements OnInit {

  public isEmojiVisible = false;
  messageArray = [];
  public messageText;

  constructor(
    private chatService: ChatService
  ) { }

  @ViewChild('textinput', {static: false}) textinput: ElementRef;

  ngOnInit() {
  }

  private get textInput() {
    return this.textinput.nativeElement;
  }

  public sendMessage(form: NgForm) {
    // console.log(message.value)
    // this.messageArray.push(this.textInput.value);
    this.chatService.sentMessage(this.textInput.value).subscribe(res =>{
      // console.log(res)
    })
    form.reset();

  }

  public triggerFunction(event: any) {
    if (event.ctrlKey && event.key === 'Enter') {
      /*
        cannot make textarea produce a next line.
      */
      const text: any = document.getElementById('message');
      text.value += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.messageArray.push(this.textInput.value);
    }
  }

  addEmoji(emoji: any) {
    // const textInput = this.textinput.nativeElement;
    // declare cursor position
    const cursorPointer = this.textInput.selectionEnd;
    // set place after emoji start
    const start = this.textInput.value.substring(0, this.textInput.selectionStart);
    // set place after emoji end
    const end = this.textInput.value.substring(this.textInput.selectionStart);
    //  concatenate text with emoji
    const text = start + emoji.emoji.native + end;
    // put text in textarea
    this.textInput.value = text;
    // focus on textarea
    this.textInput.focus();
    // console.log(emoji.emoji.native);
  }

  public showEmoji(){
    this.isEmojiVisible = !this.isEmojiVisible;
  }
  hideEmoji(){
    this.isEmojiVisible = false;
  }



}
