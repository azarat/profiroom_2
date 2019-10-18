import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorysListService, SubCategorysListInterface } from '../../core/services/get-categorys.service';
import { CategoryResolver } from '../resolves/categories.resolve';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit {
  subcategoriesList: SubCategorysListInterface;
  constructor(
    // private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private CategorysListService: CategorysListService,
  ) { }

  ngOnInit() {
    this.CategorysListService.categoriesList$
    .subscribe(res => {
      console.log(['res', res])
      this.subcategoriesList = res;
    });
  }

}
