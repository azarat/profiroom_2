import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoriesListService } from '../../core/services/categories.service';
import { CategoryListInterface } from '../../shared/interfaces/categories-list.interface';
import { SiteLocaleService } from 'src/app/core/services/site-locale.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home-page.component.html',
  styleUrls: ['./catalog-home-page.component.scss']
})
export class CatalogHomePageComponent implements OnInit, OnDestroy {

  categoriesList: CategoryListInterface ;
  // dataList: CategoriesList;
  public currentLang: string = null;
  public openedList: number = null;

  constructor(
    private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private categoriesListService: CategoriesListService,
    private siteLocalService: SiteLocaleService
  ) { }

  ngOnInit() {
    this.subscribeLang();
    this.categoriesListService.getCategories()
    .subscribe(res => {
      this.categoriesList = res;
    });
  }
  navigateTo() {
    this.route.navigate( [''] );
  }

  private subscribeLang() {
    this.siteLocalService.currentLang$
    .pipe(filter((res: any) => !!res))
    .subscribe((res: any) => {
      this.currentLang = res;
    });
  }

  public showSubCattegorys(index) {
    this.openedList = index;
  }

  ngOnDestroy(): void {}

}
