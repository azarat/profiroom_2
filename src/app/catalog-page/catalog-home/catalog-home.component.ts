import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorysListService } from '../../core/services/categorys.service';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';

@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home.component.html',
  styleUrls: ['./catalog-home.component.scss']
})
export class CatalogHomeComponent implements OnInit {

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
      // console.log("strat");
      console.log(res);
      this.categorysList = res;
    });
  }
  navigateTo() {
    this.route.navigate( [''] );
  }

}
