import { Component, OnInit } from '@angular/core';
import { CategorysListService } from '../../../core/services/categorys.service';


@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.scss']
})
export class CategoriesHeaderComponent implements OnInit {
  categorysList: any;

  constructor(
    private categorysListService: CategorysListService
    ) {
      this.categorysListService.getCategorys()
    }

  ngOnInit() {
    this.categorysListService.getCategorys()
    .subscribe(res => {
      this.categorysList = res;
    });
  }

}
