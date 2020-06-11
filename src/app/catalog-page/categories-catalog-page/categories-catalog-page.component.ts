import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GetCategoryItemsService } from '../services/get-category-items.service';
import { SubCategoryListInterface } from '../../shared/interfaces/subcategories-list.interface';
import { CategoriesResolver } from '../resolves/categories.resolve';
import { SiteLocaleService } from 'src/app/core/services/site-locale.service';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-categories-catalog',
  templateUrl: './categories-catalog-page.component.html',
  styleUrls: ['./categories-catalog-page.component.scss']
})
export class CategoriesCatalogPageComponent implements OnInit {
  subcategoriesList: SubCategoryListInterface = null;
  public currentLang: string = null;

  constructor(
    // private route: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private getCategoryItemsService: GetCategoryItemsService,
    private siteLocalService: SiteLocaleService
  ) {
  }

  ngOnInit() {
    this.subscribeLang();
    this.getCategoryItemsService.categoriesList$.subscribe((res: any) => {
      this.subcategoriesList = res;
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
