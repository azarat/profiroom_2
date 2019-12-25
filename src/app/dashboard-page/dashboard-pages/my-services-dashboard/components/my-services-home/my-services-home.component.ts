import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

import { map, filter, first } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { UserOffersService } from '../../services/user-offers.service';
import { tabsConst } from '../../consts/tabs.const';

@Component({
  selector: 'app-my-services-home',
  templateUrl: './my-services-home.component.html',
  styleUrls: ['./my-services-home.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
})
export class MyServicesHomeComponent implements OnInit {

  public userServices: UserServiceModel[] = null;
  activatedRoute: ActivatedRoute;
  menuOpen = null;
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services/create');
  serviceToDeleteId: string = null;

  currentTab: string = null;
  tabs = tabsConst;

  @ViewChild('scrolledBlock', {static: false}) el: ElementRef;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private userOfferService: UserOffersService,
    // tslint:disable-next-line: variable-name
  ) { }

  ngOnInit() {
    this.getUserServices();

  }

  // ngOnDestroy() {
  // }
  setCurrentTab(tab: string) {
    this.currentTab = tab;

    this.el.nativeElement.scroll(0, 0)
  }


  getUserServices() {
    this.userOfferService.showServices()
      .pipe(
        filter((res: any) => !!res),
        first()
      )
      .subscribe((res: any) => {
        console.log(res)
        if (res.userOffers.length > 0) {
          this.userServices = plainToClass(UserServiceModel, this.deleteEmptyService(res.userOffers).slice().reverse());
        } else {
          this.userServices = [];
        }
      });
  }

  deleteService(id: string) {
    this.serviceToDeleteId = id;
  }
  cencel() {
    this.serviceToDeleteId = null;
  }

  confirmDelete() {
    this.userOfferService.deleteService(this.serviceToDeleteId)
      .subscribe((res: any) => {
        if (res.status === 'ok') {
          this.userServices = this.userServices.filter(el => el.id !== this.serviceToDeleteId);
        }
      });
  }

  createNewService() {
    this.userOfferService.serviceCreation()
      .pipe(filter((response: any) => !!response))
      .subscribe(res => {
        this.router.navigate([this.translatedPath],
          {
            relativeTo: this.activatedRoute,
            queryParams: res,
            queryParamsHandling: 'merge',
          });
      });
  }

  openOffer(id: number) {
    this.router.navigate([this.translatedPath],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          offerId: id
        },
        queryParamsHandling: 'merge',
      }
    );
  }

  showMenu(i: number) {
    if (this.menuOpen !== i) {
      this.menuOpen = i;
    } else {
      this.menuOpen = null;
    }

  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:');
    // this.menuOpen = null;
  }

  // delete offer which has no name if user close offer creation process
  deleteEmptyService(arr: UserServiceModel[]) {
    arr.forEach(el => {
      if (el.title === null) {
        console.log('null');
        this.userOfferService.deleteService(el.id)
          .subscribe(res => {
            return;
          })
      }
    });
    return arr.filter(el => el.title !== null);
  }


  hideMenu(i) {
    if ( this.menuOpen === i ) {
      this.menuOpen = null;
    }

  }



}
