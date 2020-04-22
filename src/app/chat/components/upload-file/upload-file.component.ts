import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilesInterface } from '../../interfaces/files.interface';
import { FileLoaderService } from '../../services/file-loader.service';
import { ChatService } from '../../services/chat.service';
import { MessageScrollService } from '../../services/message-scroll/message-scroll.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {


  @Input() collocutorData;
  @Input() chatType: string;
  @Input() isFileLoaderVisible: boolean;
  @Output() isFileLoaderVisibleChange = new EventEmitter<boolean>();
  @Output() uploadedBriefFiles = new EventEmitter<any>();

  public disabled = false;
  public files: FilesInterface[] = [];
  private filesCount: number = null;

  constructor(
    private fileLoaderService: FileLoaderService,
    private chatService: ChatService,
    private messageScrollService: MessageScrollService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    console.log(this.collocutorData);
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

    for (let index = 0; index < event.length; index++) {
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

  sendMessage() {
    const MessageString = JSON.stringify(this.files);
    this.chatService.sendMessage(MessageString, this.collocutorData.roomId, 'file', this.chatType)
      .subscribe(res => console.log(res));
    this.isFileLoaderVisibleChange.emit(false);
    this.messageScrollService.onMessageScrollBottom();
  }
}
