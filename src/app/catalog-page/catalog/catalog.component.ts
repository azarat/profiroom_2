import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';

import { GetOffersService } from '../services/get-offers.service';
import { Subscription, pipe, Observable } from 'rxjs';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { plainToClass } from 'class-transformer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

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

  offersList: OffersListInterface;

  catalogSubscription: Subscription;

  constructor(
    // tslint:disable-next-line: variable-name
    public _getOffersService: GetOffersService,
    // tslint:disable-next-line: no-shadowed-variable
    private GetOffersService: GetOffersService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private router: Router, 
    private titleService: Title
  ) {

    this._route.params.subscribe(Params => {
      this.catalogFilters = plainToClass(CatalogFiltersModel, Params);
      this.catalogFilters.subCategory = Params.subCategory;
      this.category = Params.category;
      this.GetOffersService.getOffers(this.catalogFilters);
    });

    //----------- проверка наличия каких либо парметров в queryParams ------------//  
    this._route.queryParams.subscribe(qParams => {
      console.log('qp ', qParams);
      if (qParams && (Object.keys(qParams).length === 0)) {
    //----------- используем даные (категория, подкатегория) из ActivatedRoute.params ------------//  
        this.GetOffersService.getOffers(this.catalogFilters);
        console.log('pusto  ', qParams);
      } else {
        this.catalogFilters.current_page = 1;
    //----------- устанавливаем параметры из ActivatedRoute.queryParams ------------//  
        this.GetOffersService.setFilters(qParams);
        this.catalogFilters = plainToClass(CatalogFiltersModel, qParams);
        this.catalogFilters.online = (qParams.online === "true") ? true: false;
        this.GetOffersService.getOffers(this.catalogFilters);
      }
    });

  }

  ngOnInit() {

    this.titleService.setTitle('Каталог');

    this.GetOffersService.offersList.subscribe(data => {
      this.offersList = data;
      if (this.offersList) {
        this.pagesToShow();
      }
    });
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
}

