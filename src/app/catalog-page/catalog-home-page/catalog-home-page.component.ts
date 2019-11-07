import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorysListService } from '../../core/services/get-categorys-list.service';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';

@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home-page.component.html',
  styleUrls: ['./catalog-home-page.component.scss']
})
export class CatalogHomePageComponent implements OnInit {

  categorysList: CategoryListInterface ;
  // dataList: CategorysList;

  constructor(
    private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private CategorysListService: CategorysListService
  ) { }

  ngOnInit() {
    this.CategorysListService.getCategorys()
    .subscribe(res => {
      this.categorysList = res;
    });
  }
  navigateTo() {
    this.route.navigate( [''] );
  }

}
