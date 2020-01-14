import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-uploaded-files',
  templateUrl: './show-uploaded-files.component.html',
  styleUrls: ['./show-uploaded-files.component.scss']
})
export class ShowUploadedFilesComponent implements OnInit {

  isUploadFilesVisible = null;

  files = [
    {
      name: 'asdasdasdasdasdads',
      type: 'zip',
      date: '15.02.2018'
    },
    {
      name: 'asdasdasdasdasdads',
      type: 'pdf',
      date: '15.02.2018'
    },
    {
      name: 'asdasdasdasdasdads',
      type: 'jpg',
      date: '15.02.2018'
    },

  ]
  constructor() { }

  ngOnInit() {
  }

  showFiles() {
    if (this.isUploadFilesVisible === null) {
      this.isUploadFilesVisible = true;
    } else {
      this.isUploadFilesVisible = !this.isUploadFilesVisible;
    }

  }

}
