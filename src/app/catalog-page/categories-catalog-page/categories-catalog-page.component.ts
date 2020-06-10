import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetCategoryItemsService } from '../services/get-category-items.service';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';
import { CategoriesResolver } from '../resolves/categories.resolve';



@Component({
  selector: 'app-categories-catalog',
  templateUrl: './categories-catalog-page.component.html',
  styleUrls: ['./categories-catalog-page.component.scss']
})
export class CategoriesCatalogPageComponent implements OnInit {
  subcategoriesList: SubCategoryListInterface = null;
  constructor(
    // private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private getCategoryItemsService: GetCategoryItemsService
  ) {
  }

  ngOnInit() {
    this.getCategoryItemsService.categoriesList$.subscribe((res: any) => {
      this.subcategoriesList = res;
    });
  }
}
