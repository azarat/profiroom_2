import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { UserService } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../services/user-offers.service';
import { map } from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-my-services-home',
  templateUrl: './my-services-home.component.html',
  styleUrls: ['./my-services-home.component.scss']
})
export class MyServicesHomeComponent implements OnInit {

  userOffers: UserService ;
  activatedRoute: ActivatedRoute;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private userOfferService: UserOffersService,
    // private _userService: UserServices
  ) { }

  ngOnInit() {
    this.userOfferService.showUserServices()
      .subscribe((res: any) => {
        console.log(res)
        // let userOffers = plainToClass()
        // this.userOffers = res.userOffers.slice().reverse();
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
  }
}
