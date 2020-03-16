import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  OfferDataInterface
} from 'src/app/shared/interfaces/offer-date.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';


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
  public extraFeaturesResultArr;
  public extraFeaturesResult;

  public outputDealData: {
    id?: number;
    userId?: number;
    finalPrice?: number;
    extra_terms?: boolean;
    term?: number;
    extraChanges?: boolean;
    сhangesCount?: number;
    extra_features?: {
      title?: string;
      price?: number;
    } [];
  } = {};

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

  private initForm() {
    this.checkoutForm = this.fb.group({
      extraTerms: [null],
      extraСhanges: [null],
      extraCommercial: [null],
    });
    this.offerData.extra_features.forEach((el: any) => {
      this.checkoutForm.addControl(el.title, this.fb.control(null));
    });

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
    this.extraFeaturesResultArr = Object.values(this.checkoutForm.value);
    this.extraFeaturesResult = this.checkoutForm.value;
    // console.log('this.extraFeaturesResult', this.extraFeaturesResult)
    this.calculateFinalPrice();
    this.createFinalDealData();
    // for (let key in this.checkoutForm.value) {
    //   if (this.checkoutForm.value[key] === true && key !== 'packageTitle') {
    //     this.noOneCheked = true;
    //     console.log(this.checkoutForm.value);
    //     console.log(this.noOneCheked);
    //   } else {
    //     this.noOneCheked = false;
    //   }
    // }
  }

  calculateFinalPrice() {
    this.finalSum = 0;
    // ---сума пакета---//
    this.finalSum += this.offerData.basic.price;
    // ---сума комисия---//
    this.finalSum += this.serviceCommission;
    // ---сума за сжатые сроки---//
    if (this.extraFeaturesResultArr[0]) {
      this.offerData.extra_terms.forEach((item) => {
        if (item.package === this.currentPackage) {
          this.finalSum += item.price;
        }
      });
    }
    // ---сума за комерцию---//
    if (this.extraFeaturesResultArr[1]) {
      this.finalSum += this.offerData.extra_commercial.price;
    }
    // ---сума за дополнительные правки---//
    if (this.extraFeaturesResultArr[2]) {
      this.finalSum += this.offerData.extra_changes.price;
    }
    // ---сума за доп фичи---//
    for (let i = 3; i < this.extraFeaturesResultArr.length; i++) {


      // console.log(this.extraFeaturesResultArr);
      if (this.extraFeaturesResultArr[i]) {
        // console.log(i);
        this.finalSum += this.offerData.extra_features[i - 3].price;

      }
    }
  }

  private createFinalDealData() {
    const featuresArr = Object.keys(this.extraFeaturesResult).map((key) => {
      return {
        name: key,
        value: this.extraFeaturesResult[key]
      };
    });
    this.outputDealData.extra_features = [];
    this.offerData.extra_features.filter(element => {
      featuresArr.forEach(el => {
        if (element.title === el.name && el.value === true) {
          this.outputDealData.extra_features.push(element);

        }
      });
    });
    console.log(featuresArr);
    console.log(this.outputDealData);
    // if (featuresArr[0].value) { this.outputDealData.push(element)}

    const mainselectedOptions = featuresArr.filter(el => {
      return el.value === true;
    });

    const isExtraTerms = mainselectedOptions.some(el => {
      return el.name === 'extraTerms';
    });
    const isExtraChanges = mainselectedOptions.some(el => {
      return el.name === 'extraСhanges';
    });

    // возращаем "дней выполнения" из доп. опции(сжатые строки) или из пакета
    this.outputDealData.term = isExtraTerms === true ?
    this.filterTerm(this.offerData.extra_terms) :
    this.offerData[this.currentPackage].term;

    // возращаем количестово дополнительных правок из доп. опции или из пакета
    this.outputDealData.сhangesCount = isExtraChanges === true ?
    this.offerData.extra_changes.count :
    this.offerData[this.currentPackage].changes;

    // возращаем "возвращаем количество правок"
    this.outputDealData.finalPrice = this.finalSum;

    console.log(this.outputDealData);
  }

  private filterTerm(arr: any) {
    return arr.filter(el => {
      return el.package === this.currentPackage;
    })[0].count_days;
  }

}
