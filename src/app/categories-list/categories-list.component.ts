import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }
  navigateTo() {
    this.route.navigate( [''] );
  }
}
