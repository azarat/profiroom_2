import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorysListService } from '../../core/services/get-categorys.service';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';

import { CategoryResolver } from '../resolves/categories.resolve';

@Component({
  selector: 'app-categories-catalog',
  templateUrl: './categories-catalog.component.html',
  styleUrls: ['./categories-catalog.component.scss']
})
export class CategoriesCatalogComponent implements OnInit {

  subcategoriesList: SubCategoryListInterface;
  constructor(
    // private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private CategorysListService: CategorysListService,
  ) { }

  ngOnInit() {
    this.CategorysListService.categoriesList$
    .subscribe(res => {
      // console.log("subcategoriesList");
      if ( res !== null) {
        this.subcategoriesList = res.category[0];
        // console.log(this.subcategoriesList);
      }
    });
  }


}
