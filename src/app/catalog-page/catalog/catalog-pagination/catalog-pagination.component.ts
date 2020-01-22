import { Component, OnInit, Input } from '@angular/core';
import { CatalogFiltersModel } from 'src/app/models/catalog-filter/filter.model';
import { GetOffersService } from '../../services/get-offers.service';
import { OffersListInterface } from 'src/app/shared/interfaces/offers-list.interface';

@Component({
  selector: 'app-catalog-pagination',
  templateUrl: './catalog-pagination.component.html',
  styleUrls: ['./catalog-pagination.component.scss']
})
export class CatalogPaginationComponent implements OnInit {

  @Input() catalogFilters: CatalogFiltersModel;
  public pagesArr = [];
  offersList: OffersListInterface;

  constructor(
    private getOffersService: GetOffersService,
  ) { }

  ngOnInit() {


    // console.log(this.catalogFilters);
    this.getOffersService.offersList.subscribe(data => {
      if (data) {
        this.offersList = data;
        console.log(this.offersList.page);
      }

      if (this.offersList) {
          this.pagesToShow();
        }
    });

  }

  onPrevPage() {
    this.catalogFilters.page = this.offersList.page.current_page - 1;
    // console.log(this.catalogFilters.page);
    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }
  onNextPage() {
    this.catalogFilters.page = this.offersList.page.current_page + 1;
    // console.log(this.catalogFilters.page);
    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }
  onPage(x) {
    this.catalogFilters.page = x;
    // console.log(this.catalogFilters.page);
    this.getOffersService.setFilters(this.catalogFilters);
    this.pagesToShow();
  }

  pagesToShow() {
    this.pagesArr = [];

    let a = this.offersList.page.current_page;
    // console.log("a - current_page", a);
    if ( this.offersList.page.current_page === 1 ||
         this.offersList.page.current_page === 2 ) {
      a = 3;
    } else if (this.offersList.page.current_page === this.offersList.page.last_page ||
              this.offersList.page.current_page === this.offersList.page.last_page - 1 ) {
      a = this.offersList.page.last_page - 2;
    } else {
      a = this.offersList.page.current_page;
    }

    // pagesToShow
    const b = a + 2;
    // console.log(a);
    for (let i = a - 1; i < b; i++ ) {
      this.pagesArr.push(i);
    }

  }
}
