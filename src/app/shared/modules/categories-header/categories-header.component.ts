import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CategoriesListService } from '../../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { SiteLocaleService } from 'src/app/core/services/site-locale.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.scss']
})
export class CategoriesHeaderComponent implements OnInit, OnDestroy {
  categoriesList: any;
  public noHover = false;
  public currentLang: string = null;
  // @Output() public hoverStatus = new EventEmitter();

  constructor(
    private categoriesListService: CategoriesListService,
    private _route: ActivatedRoute,
    private siteLocalService: SiteLocaleService
  ) {
    this._route.data.subscribe(Params => {
      if(Params.localizeRouter && !Params.localizeRouter.path || Params.localizeRouter
        && Params.localizeRouter.path === 'catalog' && Object.keys(Params).length === 1) {
        this.noHover = true;
      }
    });
  }

  ngOnInit() {
    this.subscribeLang();
    this.categoriesListService.getCategories()
    .subscribe(res => {
      this.categoriesList = res;
    });
  }

  private subscribeLang() {
    this.siteLocalService.currentLang$
    .pipe(filter((res: any) => !!res))
    .subscribe((res: any) => {
      this.currentLang = res;
    });
  }

  ngOnDestroy(): void {}

}
