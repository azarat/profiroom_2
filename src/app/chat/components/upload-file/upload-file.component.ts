import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilesInterface } from '../../interfaces/files.interface';
import { FileLoaderService } from '../../services/file-loader.service';
import { ChatService } from '../../services/chat.service';
import { MessageScrollerService } from '../../services/message-scroller/message-scroller.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() collocutorData;
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();
  public disabled = false;
  public files: FilesInterface[] = [];
  private filesCount: number = null;

  constructor(
    private fileLoaderService: FileLoaderService,
    private chatService: ChatService,
    private messageScrollerService: MessageScrollerService
  ) { }

  ngOnInit() {
  }

  openFileLoader() {
  }

  closeWindow() {
    this.isFileLoaderVisibleChange.emit(false);
  }


  //  --------------- file uploading ---------------
  fileProgress = (event: any) => {
    this.disabled = false;
    const filesToUpload = [];
    const formData: FormData = new FormData();
    formData.append('roomId', this.collocutorData.roomId);

    for(let index = 0; index < event.length; index++) {
      filesToUpload.push(event[index]);
    }
    // // ------- put files in FormData -------//
    filesToUpload.forEach((el: any) => {
      formData.append(el.name, el, el.name);
    });

    // // ------- load Files -----

    this.fileLoaderService.uploadFiles(formData)
      .subscribe((res: []) => {
        res.forEach(el => {
          this.files.push(el);
        });
        this.disabled = true;
      });
  }

  // --------------- delete files -----------------//
  deleteAttachment = (index: number) => {
    // this.userOffersService.deleteFile({ id: index })
    //   .subscribe((res: any) => {
    //     if (res.status === 'ok') {
    //       this.previewUrl = this.previewUrl.filter((obj: any) => {
    //         return obj.id !== index;
    //       });
    //     }
    //   });
  }

  sentMessage() {
    const MessageString = JSON.stringify(this.files);
    this.chatService.sentMessage(MessageString, this.collocutorData.roomId, 'file')
    .subscribe(res => console.log(res));
    this.isFileLoaderVisibleChange.emit(false);

    this.messageScrollerService.onMessageScrollBottom();
  }

}
