import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { messages } from '../consts/messages.const';
import { SocetService } from '../../services/socet.service';
import { CollocutorListModel } from 'src/app/models/chat/collocutors-list.model';

declare var $: any;

@Component({
  selector: 'app-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss']
})
export class MessagerComponent implements OnInit {

  messages: any[] = messages;

  public isEmojiVisible = false;
  messageArray = [];
  public messageText;
  @Input() collocutorData: CollocutorListModel;
  // @Input() collocutorImg: string;
  public messagesList = [];


  constructor(
    private chatService: ChatService,
    private socetService: SocetService
  ) { }

  @ViewChild('textinput', { static: false }) textinput: ElementRef;

  ngOnInit() {
    this.socetService.openChat(this.collocutorData.roomId)
      .subscribe(res => {
        console.log('socet', res);
        this.messagesList.push(res);
      });

    this.chatService.getPreviousMessages(this.collocutorData.roomId)
      .subscribe((res: any) => {

        this.messagesList = res[0];
        console.log(this.messagesList);
      });
  }

  private get textInput() {
    return this.textinput.nativeElement;
  }

  public sendMessage(form: NgForm) {

    this.chatService.sentMessage(this.textInput.value, this.collocutorData.roomId).subscribe(res => {
    });
    form.reset();
  }

  public triggerFunction(event: any, form: NgForm) {
    if (event.ctrlKey && event.key === 'Enter') {
      /*
        cannot make textarea produce a next line.
      */
      const text: any = document.getElementById('message');
      text.value += '\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage(form);
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

  public showEmoji() {
    this.isEmojiVisible = !this.isEmojiVisible;
  }
  hideEmoji() {
    this.isEmojiVisible = false;
  }
}
