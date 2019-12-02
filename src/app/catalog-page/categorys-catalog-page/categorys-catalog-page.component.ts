import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetCategorieItemsService } from '../services/get-categorie-items.service';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';

import { CategorysResolver } from '../resolves/categorys.resolve';

@Component({
  selector: 'app-categories-catalog',
  templateUrl: './categorys-catalog-page.component.html',
  styleUrls: ['./categorys-catalog-page.component.scss']
})
export class CategorysCatalogPageComponent implements OnInit {
  subcategoriesList: SubCategoryListInterface = null;
  constructor(
    // private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private GetCategorieItemsService: GetCategorieItemsService
  ) {}

  ngOnInit() {
    this.GetCategorieItemsService.categoriesList$.subscribe((res: any) => {
      this.subcategoriesList = res;
      console.log(this.subcategoriesList);
    });
  }
}
