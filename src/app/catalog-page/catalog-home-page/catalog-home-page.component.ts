import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoriesListService } from '../../core/services/categories.service';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';

@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home-page.component.html',
  styleUrls: ['./catalog-home-page.component.scss']
})
export class CatalogHomePageComponent implements OnInit {

  categoriesList: CategoryListInterface ;
  // dataList: CategoriesList;

  constructor(
    private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private categoriesListService: CategoriesListService
  ) { }

  ngOnInit() {
    this.categoriesListService.getCategories()
    .subscribe(res => {
      this.categoriesList = res;
    });
  }
  navigateTo() {
    this.route.navigate( [''] );
  }

}
