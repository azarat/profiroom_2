import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LinkService } from '../core/services/link-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Gigrum | Главная');
    this.linkService.addTag( { rel: 'canonical', href: 'url here'} );
  }

}
