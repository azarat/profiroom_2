import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categoryList = [
    {
      name: 'Графика & Дизайн'
    },
    {
      name: 'Программирование',
    },
    {
      name: 'Копирайтинг & Переводы',
    },
    {
      name: 'СЕО & Аналитика',
    },
    {
      name: 'Графика & Дизайн'
    },
    {
      name: 'Видео & Анимация'
    }
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
