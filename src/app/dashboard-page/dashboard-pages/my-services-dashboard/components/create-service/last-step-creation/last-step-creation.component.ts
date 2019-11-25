import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-last-step-creation',
  templateUrl: './last-step-creation.component.html',
  styleUrls: ['./last-step-creation.component.scss']
})
export class LastStepCreationComponent implements OnInit {

  constructor(
    private userOffersService: UserOffersService,
  ) { }
  @Input() userService: UserServiceModel;
  ngOnInit() {
  }

  publishOffer() {
    this.userService.published = true;
    this.userOffersService.updateService(this.userService)
      .pipe(filter((res: any) => !! res))
      .subscribe( res => console.log(res));
  }

}
