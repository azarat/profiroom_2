import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategorysListService } from '../../../core/services/categorys.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.scss']
})
export class CategoriesHeaderComponent implements OnInit {
  categorysList: any;
  public noHover = false;

  // @Output() public hoverStatus = new EventEmitter();

  constructor(
    private categorysListService: CategorysListService,
    private _route: ActivatedRoute,
  ) {
    this.categorysListService.getCategorys();

    if(this._route.snapshot.routeConfig.path === ""){
      this.noHover = true;
    }
  }

  ngOnInit() {
    this.categorysListService.getCategorys()
    .subscribe(res => {
      this.categorysList = res;
    });
    // this.hoverStatus.emit(true);
  }

}
