import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  OfferDataInterface
} from 'src/app/shared/interfaces/offer-date.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ServicePageService } from '../../services/service-page.service';
import { filter } from 'rxjs/operators';


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

  public IsChecked = false;
  public checkoutForm: FormGroup;
  public extraFeatures;
  public extraFeaturesResultArr;
  public extraFeaturesResult;
  @Input() chousenPackage;
  @Output() public checkoutHidden: EventEmitter<any> = new EventEmitter<any>();

  // public extraFeatures: ExtraFeaturesModel;
  public openFeatures: any;

  public outputDealData: {
    offer_id?: number;
    userId?: number;
    package?: string;
    finalPrice?: number;
    extraTerms?: boolean;
    term?: number;
    extraChanges?: boolean;
    extraComercial?: boolean;
    changesFinal?: number;
    extra_features?: {
      title?: string;
      price?: number;
    } [];
  } = {};

  constructor(
    private fb: FormBuilder,
    private servicePageService: ServicePageService
  ) {}

  ngOnInit() {
    this.currentPackage = this.chousenOnOfferPage.packageTitle;
    this.initForm();
    this.chousenFeatures();
    // this.steValuesFromOfferPage(this.extraFeaturesResult);
    this.outputDealData.changesFinal = this.offerData[this.currentPackage].changes;
  }

  goToOffer() {
    this.checkoutHidden.emit();
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
    console.log(this.checkoutForm.value);
  }

  chousenFeatures() {
    this.extraFeaturesResultArr = Object.values(this.checkoutForm.value);
    this.extraFeaturesResult = this.checkoutForm.value;
    this.IsChecked = true;
    console.log('this.extraFeaturesResult', this.extraFeaturesResult);
    console.log('this.extraFeaturesResultArr', this.extraFeaturesResultArr);
    this.calculateFinalPrice();
    this.createFinalDealData();
    if(this.extraFeaturesResultArr.some(element => element === true)) {
      this.noOneCheked = false;
      console.log(this.noOneCheked);
    } else {
      this.noOneCheked = true;
      console.log(this.noOneCheked);
    }
    // for (let key in this.extraFeaturesResult) {
    //   if (this.extraFeaturesResult[key] !== true && key !== 'packageTitle') {
    //     this.noOneCheked = true;
    //     console.log(this.checkoutForm.value);
    //     console.log(this.noOneCheked);
    //   } else {
    //     this.noOneCheked = false;
    //   }
    // }
  }

  public setValuesOnFirstLoad(x) {
    if(this.extraFeaturesResult[x]) {
      return this.IsChecked
    }
   
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
      if (this.extraFeaturesResultArr[i]) {
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

    const mainselectedOptions = featuresArr.filter(el => {
      return el.value === true;
    });

    const isExtraTerms = mainselectedOptions.some(el => {
      return el.name === 'extraTerms';
    });
    const isExtraChanges = mainselectedOptions.some(el => {
      return el.name === 'extraСhanges';
    });
    const isExtraComercial = mainselectedOptions.some(el => {
      return el.name === 'extraCommercial';
    });

    // возращаем "дней выполнения" из доп. опции(сжатые строки) или из пакета
    if(isExtraTerms) {
      this.outputDealData.term = this.filterTerm(this.offerData.extra_terms);
      this.outputDealData.extraTerms = true;
    } else {
      this.outputDealData.term = this.offerData[this.currentPackage].term;
      this.outputDealData.extraTerms = false;
    }

    // возращаем количестово дополнительных правок из доп. опции или из пакета
    if(isExtraChanges) {
      this.outputDealData.changesFinal = this.offerData[this.currentPackage].changes + this.offerData.extra_changes.count;
      this.outputDealData.extraChanges = true;
    } else {
      this.outputDealData.changesFinal = this.offerData[this.currentPackage].changes;
      this.outputDealData.extraChanges = false;
    }
    
    // статус комерческого использования
    this.outputDealData.extraComercial = isExtraComercial === true ? true: false;

    // возращаем "возвращаем конечную цену"
    this.outputDealData.finalPrice = this.finalSum;

    // загальні данні по оферу
    this.outputDealData.offer_id = this.offerData.id;
    this.outputDealData.userId = this.offerData.user_id;
    this.outputDealData.package = this.currentPackage;

    console.log(this.outputDealData);
  }

  private filterTerm(arr: any) {
    return arr.filter(el => {
      return el.package === this.currentPackage;
    })[0].count_days;
  }

  sendDealData() {
    this.servicePageService.makeDeal(this.outputDealData, this.outputDealData.offer_id);
  }
}


