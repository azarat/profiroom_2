import { Component, OnInit, Input, Output } from '@angular/core';
import { InfoMessageInterface } from '../../interfaces/info-message.interface';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-inform-popup',
  templateUrl: './inform-popup.component.html',
  styleUrls: ['./inform-popup.component.scss']
})
export class InformPopupComponent implements OnInit {

  @Input() message: InfoMessageInterface | any;

  @Output() mesageChange = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  closeInformPopUp() {
    this.mesageChange.emit(this.message = null);
  }

}
