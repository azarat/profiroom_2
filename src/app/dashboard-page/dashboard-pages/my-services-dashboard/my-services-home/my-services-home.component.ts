import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../services/user-offers.service';

@Component({
  selector: 'app-my-services-home',
  templateUrl: './my-services-home.component.html',
  styleUrls: ['./my-services-home.component.scss']
})
export class MyServicesHomeComponent implements OnInit {

  userOffers: UserServiceModel = null;
  activatedRoute: ActivatedRoute;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private userOfferService: UserOffersService
  ) { }

  ngOnInit() {
    this.userOfferService.showUserServices()
      .subscribe((res: any) => {
        console.log(res);
        this.userOffers = res.userOffers.slice().reverse();
      });
  }
  createNewService() {
    const translatedPath: any = this.localize.translateRoute('/dashboard/my-services/create');
    this.router.navigate([translatedPath]);
  }

  openOffer(id: number) {

    const translatedPath: any = this.localize.translateRoute('/dashboard/my-services/create');
    this.router.navigate([translatedPath]);

    this.router.navigate([translatedPath],

       {
        relativeTo: this.activatedRoute,
        queryParams: {
          offerId: id
        },
        queryParamsHandling: 'merge',
      }
    );
    console.log(this.router.url);
  }
}
