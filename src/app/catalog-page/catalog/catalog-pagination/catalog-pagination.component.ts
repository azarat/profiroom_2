import { Component, OnInit, Input, Output } from '@angular/core';
import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';
import { GetOffersService } from '../../services/get-offers.service';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalog-pagination',
  templateUrl: './catalog-pagination.component.html',
  styleUrls: ['./catalog-pagination.component.scss']
})
export class CatalogPaginationComponent implements OnInit {

  @Input() catalogFilters: CatalogFiltersModel;
  @Output() uploadedOfers = new EventEmitter();

  public pagesArr = [];
  offersList: OffersListInterface;

  private currentPage = 1;
  private curentFilters: CatalogFiltersModel;
  loader = null;

  constructor(
    private getOffersService: GetOffersService,
  ) { }

  ngOnInit() {
    this.getOffersService.offersList.subscribe(data => {
      if (data) {
        this.offersList = data;
      }
      if (this.offersList) {
        this.pagesToShow();
      }
    });
    this.getOffersService.filterVaraibles
    .subscribe((res: any) => {
      this.curentFilters = res;
    });
  }

  onPrevPage() {
    this.catalogFilters.page = this.offersList.current_page - 1;

    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }
  onNextPage() {
    this.catalogFilters.page = this.offersList.current_page + 1;

    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }
  onPage(x) {
    this.catalogFilters.page = x;
    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }

  pagesToShow() {
    this.pagesArr = [];

    let a = this.offersList.current_page;

    if (this.offersList.last_page > 5) {
      if ( this.offersList.current_page === 1 ||
        this.offersList.current_page === 2 ) {
         a = 3;
       } else if (this.offersList.current_page === this.offersList.last_page ||
                 this.offersList.current_page === this.offersList.last_page - 1 ) {
         a = this.offersList.last_page - 2;
       } else {
         a = this.offersList.current_page;
       }
    } else if (this.offersList.last_page === 5) {
      return this.pagesArr = [2, 3, 4];
    } else if (this.offersList.last_page === 4) {
      return this.pagesArr = [2, 3];
    } else if (this.offersList.last_page === 3) {
      return this.pagesArr = [2];
    }


    // pagesToShow
    const b = a + 2;

    for (let i = a - 1; i < b; i++ ) {
      this.pagesArr.push(i);
    }

  }

  public loadMore() {
    this.currentPage++;
    this.loader = false;
    this.curentFilters.page = this.currentPage;

    this.getOffersService.loadMoreOffers(this.curentFilters)
    .subscribe((res: any) => {
      this.loader = true;
      this.uploadedOfers.emit(res);
    });

  }
}
