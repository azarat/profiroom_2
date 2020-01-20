import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  openFileLoader() {
    // if (this.isFileLoaderVisible === null) {
    //   this.isFileLoaderVisible = true;
    // } else {
    //   this.isFileLoaderVisible = !this.isFileLoaderVisible;
    // }
  }

  closeWindow() {
    this.isFileLoaderVisibleChange.emit(false);
  }

}
