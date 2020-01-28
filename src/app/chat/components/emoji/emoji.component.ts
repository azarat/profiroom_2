import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  @Input() textinput;
  public isEmojiVisible = false;

  constructor() { }

  ngOnInit() {
  }

  public get textInput() {
    return this.textinput.nativeElement;
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
  }

  public showEmoji() {
    this.isEmojiVisible = !this.isEmojiVisible;
  }
  hideEmoji() {
    this.isEmojiVisible = false;
  }

}
