import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  public chatType = 'work';
  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Проекты');
  }

}
