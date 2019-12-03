import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserOffersService } from '../../../services/user-offers.service';
import { filter } from 'rxjs/operators';
import { LocalizeRouterService } from 'localize-router';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fourth-step-creation',
  templateUrl: './fourth-step-creation.component.html',
  styleUrls: ['./fourth-step-creation.component.scss']
})
export class FourthStepCreationComponent implements OnInit {
  translatedPath: any = this.localize.translateRoute('/dashboard/my-services');
  submited = false;
  showedItem: number = null;
  config = {
    toolbar: [['bold', 'italic', 'underline',],
    [{ list: 'bullet' }]]
  };

  @Input() userService: UserServiceModel;
  constructor(
    private userOffersService: UserOffersService,
    private localize: LocalizeRouterService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.userService.offer_faq.length === 0) {
      this.addFaqItem();
    } else {
      this.showedItem = this.userService.offer_faq.length;
    }
  }
  nextStep(form: NgForm) {
    this.submited = true;
    if (!form.valid && this.userService.offer_faq.length === 0) {
      return;
    }
    this.userOffersService.updateService(this.userService)
      .pipe(filter((res: any) => !!res))
      .subscribe(res => {
        console.log(res)
        this.userService.step = res.step;
      });
  }

  addFaqItem() {
    this.userService.offer_faq.push(
      {
        question: null,
        answer: null
      });
    this.showedItem = this.userService.offer_faq.length;
  }

  hideItem() {
    this.showedItem = null;
  }

  changeFaqItem(index: number) {
    this.showedItem = index;
  }

  deleteFaqItem(index: number) {
    this.userService.removeFaqItem(index);
  }

  quite = () => {
    this.router.navigate([this.translatedPath]);
  }
}
