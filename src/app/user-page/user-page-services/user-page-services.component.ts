import { Component, OnInit, Input } from '@angular/core';
import { UserDataInterface } from 'src/app/shared/interfaces/user-data.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-user-page-services',
  templateUrl: './user-page-services.component.html',
  styleUrls: ['./user-page-services.component.scss']
})
export class UserPageServicesComponent implements OnInit {

  @Input() userData: UserDataInterface;
  public id;
  public offersShowState = false;
  public offersShow: number = 5;

  constructor(
    // tslint:disable-next-line: variable-name
    private route: ActivatedRoute,
    private localize: LocalizeRouterService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  openOffer(offerid) {
    const translatedPath: any = this.localize.translateRoute('/service');

    this.id = {
      offerId: offerid
    };

    this.router.navigate( [translatedPath], {
      relativeTo: this.route,
      queryParams: this.id,
    });
  }

  showAllOffers() {
    this.offersShowState = !this.offersShowState;
    if (this.offersShowState === false) {
      this.offersShow = 5;
    } else {
      this.offersShow = this.userData.offers.length;
    }

    console.log(this.offersShow);

  }

}
