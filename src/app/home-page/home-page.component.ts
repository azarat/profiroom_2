import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Фриланс биржа онлайн для найма фрилансера удаленно. ');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Биржа удаленных работников для найма фрилансеров быстро, недорого, выполнение работы качественно и в срок. Найдите своего идеального фриансера!' }
    );
  }

}
