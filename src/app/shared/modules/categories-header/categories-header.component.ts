import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesListService } from '../../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.scss']
})
export class CategoriesHeaderComponent implements OnInit {
  categoriesList: any;
  public noHover = false;

  // @Output() public hoverStatus = new EventEmitter();

  constructor(
    private categoriesListService: CategoriesListService,
    private _route: ActivatedRoute,
  ) {
    this._route.data.subscribe(Params => {
      if(Params.localizeRouter && Params.localizeRouter.path === 'catalog'){
        this.noHover = true;
      }
    });
  }

  ngOnInit() {
    this.categoriesListService.getCategories()
    .subscribe(res => {
      this.categoriesList = res;
    });
    // this.hoverStatus.emit(true);
  }

}
