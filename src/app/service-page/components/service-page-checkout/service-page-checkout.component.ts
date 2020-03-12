import { Component, OnInit, Input } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-service-page-checkout',
  templateUrl: './service-page-checkout.component.html',
  styleUrls: ['./service-page-checkout.component.scss']
})
export class ServicePageCheckoutComponent implements OnInit {
  @Input() offerData: OfferDataInterface;
  @Input() chousenOnOfferPage;

  public currentPackage;

  public checkoutForm: FormGroup;

  public extraFeatures;
  public extraFeaturesResult;
  public finalSum = 0;

  public serviceCommission = 500;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.currentPackage = this.chousenOnOfferPage.packageTitle;
    // console.log(this.currentPackage);
    this.initForm();
    this.chousenFeatures();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      extraTerms: [false],
      extraChanges: [false],
      extraCommercial: [false],
    });
    this.offerData.extra_features.forEach((el: any) => {
      this.checkoutForm.addControl(el.title, this.fb.control(false));
    });
  }

  chousenFeatures() {
    this.extraFeaturesResult = Object.values(this.checkoutForm.value);
    console.log(this.extraFeaturesResult);
    console.log(this.finalSum);
    this.calculateFinalPrice();

  }

  calculateFinalPrice() {
    this.finalSum = 0;
    console.log('стартовая сума ', this.finalSum);
    this.finalSum += this.offerData.basic.price;
    console.log('+сума пакета ', this.finalSum);
    this.finalSum += this.serviceCommission;
    console.log('+сума комисия ', this.finalSum);

    if (this.extraFeaturesResult[0]) {
      this.offerData.extra_terms.forEach((item) => {
        if (item.package === this.currentPackage) {
          this.finalSum += item.price;
        }
      });
      console.log('+сума сроки ', this.finalSum);
    }
    if (this.extraFeaturesResult[1]) {
      this.finalSum += this.offerData.extra_commercial.price;
      console.log('+сума комерция ', this.finalSum);
    }
    if (this.extraFeaturesResult[2]) {
      this.finalSum += this.offerData.extra_changes.price;
    }

    for (let i = 3; i < this.extraFeaturesResult.length; i++) {
      console.log(i);
      if (this.extraFeaturesResult[i]) {
        this.finalSum += this.offerData.extra_features[i - 3].price;
        console.log(i - 3);
      }
    }
  }

}
