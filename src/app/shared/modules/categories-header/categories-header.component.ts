import { Component, OnInit } from '@angular/core';
import { CategorysListService } from '../../../core/services/get-categorys-list.service';


@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.scss']
})
export class CategoriesHeaderComponent implements OnInit {
  categorysList: any;

  constructor(
    private categorysListService: CategorysListService
    ) {}

  ngOnInit() {
    this.categorysListService.getCategorys()
    .subscribe(res => {
      // console.log(res);
      this.categorysList = res;
    });
    // this.categorysListService.sharedCatList(this.categorysList);
    // console.log("sharedCatList");
    // console.log(this.categorysList);
  }

}
