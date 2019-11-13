import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

import { map, filter } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { UserOffersService } from '../../services/user-offers.service';

@Component({
  selector: 'app-my-services-home',
  templateUrl: './my-services-home.component.html',
  styleUrls: ['./my-services-home.component.scss']
})
export class MyServicesHomeComponent implements OnInit {

  public userService: UserServiceModel = null;
  activatedRoute: ActivatedRoute;
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services/create');
  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private userOfferService: UserOffersService,
  ) { }

  ngOnInit() {
    this.userOfferService.showServices()
      .subscribe((res: any) => {
        console.log(res)
        if (res.userOffers.length > 0) {
          this.userService = plainToClass(UserServiceModel, res.userOffers.slice().reverse());
        }
      });
  }

  ngOnDestroy() {
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
}
