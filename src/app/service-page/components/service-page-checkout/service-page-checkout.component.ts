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
  public noOneCheked = false;
  public finalSum = 0;
  public serviceCommission = 500;

  public checkoutForm: FormGroup;
  public extraFeatures;
  public extraFeaturesResult;
  @Input() chousenPackage;
  // public extraFeatures: ExtraFeaturesModel;
  public openFeatures: any;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.currentPackage = this.chousenOnOfferPage.packageTitle;
    this.initForm();
    this.chousenFeatures();


    // console.log(this.chousenOnOfferPage);
    // console.log(this.checkoutForm);

    // this.steValuesFromOfferPage(this.chousenOnOfferPage);
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

    console.log(this.checkoutForm.value);
    for (let key in this.chousenOnOfferPage) {
      if (this.chousenOnOfferPage[key] && key !== 'packageTitle') {
        this.checkoutForm.value[key] = true;


      }
    }
  }

  // steValuesFromOfferPage(obj) {
  //   for (let key in obj) {
  //     if (obj[key] && key !== 'packageTitle') {
  //       this.checkoutForm.value[key] = true;
  //     }
  //   }
  //   console.log(this.checkoutForm.value);
  // }

  chousenFeatures() {
    this.extraFeaturesResult = Object.values(this.checkoutForm.value);
    this.calculateFinalPrice();

    for (let key in this.checkoutForm.value) {
      if (this.checkoutForm.value[key] === true && key !== 'packageTitle') {
        this.noOneCheked = true;
        console.log(this.checkoutForm.value);
        console.log(this.noOneCheked);
      } else {
        this.noOneCheked = false;
      }
    }
  }

  calculateFinalPrice() {
    this.finalSum = 0;
    // ---сума пакета---//
    this.finalSum += this.offerData.basic.price;
    // ---сума комисия---//
    this.finalSum += this.serviceCommission;
    // ---сума за сжатые сроки---//
    if (this.extraFeaturesResult[0]) {
      this.offerData.extra_terms.forEach((item) => {
        if (item.package === this.currentPackage) {
          this.finalSum += item.price;
        }
      });
    }
    // ---сума за комерцию---//
    if (this.extraFeaturesResult[1]) {
      this.finalSum += this.offerData.extra_commercial.price;
    }
    // ---сума за дополнительные правки---//
    if (this.extraFeaturesResult[2]) {
      this.finalSum += this.offerData.extra_changes.price;
    }
    // ---сума за доп фичи---//
    for (let i = 3; i < this.extraFeaturesResult.length; i++) {
      if (this.extraFeaturesResult[i]) {
        this.finalSum += this.offerData.extra_features[i - 3].price;
      }
    }
  }

}
