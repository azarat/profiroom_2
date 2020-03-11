import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtraFeaturesModel } from 'src/app/models/service-page/service-page.model';

@Component({
  selector: 'app-service-page-checkout',
  templateUrl: './service-page-checkout.component.html',
  styleUrls: ['./service-page-checkout.component.scss']
})
export class ServicePageCheckoutComponent implements OnInit {
  @Input() offerData: OfferDataInterface;
  @Input() chousenPackage;


  public extraFeatures: ExtraFeaturesModel;

  // public checkoutExtraFeatures: FormGroup;
  public checkoutExtraFeatures = {
      extraTerms: '',
      extraСhanges: '',
      extraCommercial: '',
  };
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.chousenPackage);

    this.initForm();
  }

  initForm() {
  //   this.checkoutExtraFeatures = this.fb.group({
  //     extraTerms: [''],
  //     extraСhanges: [''],
  //     extraCommercial: [''],
  //   });
  //   this.offerData.extra_features.forEach((el: any) => {
  //     this.checkoutExtraFeatures.addControl(el.title, this.fb.control(null));
  //   });
  // }

  this.offerData.extra_features.forEach((el: any) => {
      this.checkoutExtraFeatures[el.title] = null;
    });
    // this.checkoutExtraFeatures
  }

}
