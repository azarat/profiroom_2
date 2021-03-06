import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe, Observable } from 'rxjs';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { plainToClass } from 'class-transformer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { SiteLocaleService } from 'src/app/core/services/site-locale.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public catalogFilters: CatalogFiltersModel;
  public category;

  public currentQueryParams;
  public pagesArr = [];
  public currentLang: string = null;
  public offersList: OffersListInterface | any;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private siteLocalService: SiteLocaleService,
    private metaTagService: Meta
  ) {

    this._route.params.subscribe(Params => {
      this.catalogFilters = plainToClass(CatalogFiltersModel, Params);
      this.catalogFilters.subCategory = Params.subCategory;
      this.category = Params.category;
      this.GetOffersService.getOffers(this.catalogFilters);
    });

    // ----------- проверка наличия каких либо парметров в queryParams ------------//
    this._route.queryParams.subscribe(qParams => {
      if (qParams && (Object.keys(qParams).length === 0)) {
    // ----------- используем даные (категория, подкатегория) из ActivatedRoute.params ------------//
        this.GetOffersService.getOffers(this.catalogFilters);
      } else {
        this.catalogFilters.current_page = 1;
    //----------- устанавливаем параметры из ActivatedRoute.queryParams ------------//
        this.GetOffersService.setFilters(qParams);
        this.catalogFilters = plainToClass(CatalogFiltersModel, qParams);
        this.catalogFilters.online = (qParams.online === 'true') ? true : false;
        for (const prop in this.catalogFilters) {


          if (this.catalogFilters[prop] === 'true') {
            this.catalogFilters[prop] = true;
          } else if (this.catalogFilters[prop] === 'false') {
            this.catalogFilters[prop] = false;
          }
        }

        this.GetOffersService.getOffers(this.catalogFilters);
      }
    });
  }

  ngOnInit() {
    this.subscribeLang();
    this.titleService.setTitle('Каталог');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Биржа удаленных работников для найма фрилансеров быстро, недорого, выполнение работы качественно и в срок. Найдите своего идеального фриансера!' }
    );

    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      if (this.offersList) {
        this.pagesToShow();
      }
    });
    this.subscribeOffers();

  }

  pagesToShow() {
    this.pagesArr = [];

    // currentPage
    const a = 5;
    // pagesToShow
    const b = a + 2;

    for (let i = a - 1; i < b; i++ ) {
      this.pagesArr.push(i);
    }
  }

  private subscribeOffers() {
    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
    });
  }

  public getedOffers(arr: any) {
    this.offersList.data = this.offersList.data.concat(arr.data);
  }


  private subscribeLang() {
    this.siteLocalService.currentLang$
    .pipe(filter((res: any) => !!res))
    .subscribe((res: any) => {
      this.currentLang = res;
    });
  }
}

