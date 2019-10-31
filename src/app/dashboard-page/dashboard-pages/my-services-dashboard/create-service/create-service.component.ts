import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserOffersService } from '../services/user-offers.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userOffersService: UserOffersService
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(p => {
    //   if (p.offerId) {
    //     this.userOffersService.changeUserService(p);
    //   }
    // });
  }

}
