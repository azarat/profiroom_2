import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorysListService, CategorysList } from '../core/services/get-categorys.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categorysList: CategorysList;
  constructor(
    private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private CategorysListService: CategorysListService
  ) { }

  ngOnInit() {
    this.CategorysListService.getCategorys()
    .subscribe(res => {
      console.log(res);
      this.categorysList = res;
    });
  }
  navigateTo() {
    this.route.navigate( [''] );
  }
}
