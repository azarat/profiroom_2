import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfoMessageInterface } from '../../interfaces/info-message.interface';

@Component({
  selector: 'app-inform-popup',
  templateUrl: './inform-popup.component.html',
  styleUrls: ['./inform-popup.component.scss']
})
export class InformPopupComponent implements OnInit {

  @Input() message: InfoMessageInterface | any;

  @Output() messageChange = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeInformPopUp() {
    this.messageChange.emit(this.message = null);
  }

}
