import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service.model';
import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-last-step-creation',
  templateUrl: './last-step-creation.component.html',
  styleUrls: ['./last-step-creation.component.scss']
})
export class LastStepCreationComponent implements OnInit {
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services');
  constructor(
    private userOffersService: UserOffersService,

    private router: Router,
    private localize: LocalizeRouterService,
  ) { }
  @Input() userService: UserServiceModel;
  ngOnInit() {
  }

  publishOffer() {
    this.userService.published = true;
    this.userOffersService.updateService(this.userService)
      .pipe(filter((res: any) => !! res))
      .subscribe( res => {
        if (res.status === 'ok') {
          this.router.navigate([this.translatedPath]);
        }
      });
  }

  roureToServices() {
    this.router.navigate([this.translatedPath]);
  }

}
