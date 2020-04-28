import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';
import { ChatService } from '../../services/chat.service';
import { FilesInterface } from '../../interfaces/files.interface';

@Component({
  selector: 'app-show-uploaded-files',
  templateUrl: './show-uploaded-files.component.html',
  styleUrls: ['./show-uploaded-files.component.scss']
})
export class ShowUploadedFilesComponent implements OnInit {

  isUploadFilesVisible = null;
  @Input() chatRoom;
  files: FilesInterface[];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getUploadedFiles(this.chatRoom)
    .subscribe((res: any) => {
      this.files = res;
    });
  }

  showFiles() {
    if (this.isUploadFilesVisible === null) {
      this.isUploadFilesVisible = true;
    } else {
      this.isUploadFilesVisible = !this.isUploadFilesVisible;
    }

  }

}
