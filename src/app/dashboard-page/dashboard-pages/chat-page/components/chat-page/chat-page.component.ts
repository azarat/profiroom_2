import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chatType = 'classic';

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Чат');
  }

}
