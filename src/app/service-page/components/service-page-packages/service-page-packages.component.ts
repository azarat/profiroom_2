import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-service-page-packages',
  templateUrl: './service-page-packages.component.html',
  styleUrls: ['./service-page-packages.component.scss']
})
export class ServicePagePackagesComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() checkoutState = new EventEmitter<any>();
  @Output() scrollToCompare = new EventEmitter<any>();
  public token: any = null;
  public openFeatures = false;
  public extraFeaturesForm: FormGroup;
  public notAuth;
  extraFeatures: any;

  @Input() offerData: OfferDataInterface;
  @Input() offerId;

  public currentTab: any = 0;
  public tabs = [
    {
      name: 'базовый'
    },
    {
      name: 'стандарт'
    },
    {
      name: 'премиум'
    }
  ];
  public packages = [
    'basic',
    'advanced',
    'premium'
  ];


  constructor(
    private servicePackageService: ServicePageService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    // this.goCheckout('basic');
    this.checkUserToken();
  }

  private initForm() {
    this.extraFeaturesForm = this.fb.group({
      extraTerms: [null],
      extraСhanges: [null],
      extraCommercial: [null],
    });
    this.offerData.extra_features.forEach((el: any) => {
      if (el.published) {
        this.extraFeaturesForm.addControl(el.title, this.fb.control(null));
      }

    });
  }

  openTab = (i: number) => {
    if (!this.offerData.allPackages) {
      this.currentTab = 0;
    } else {
      this.currentTab = i;
    }
  }

  showFeatures() {
    this.openFeatures = !this.openFeatures;
  }

  // tslint:disable-next-line: variable-name
  // public orderService(_package: string) {
  //   this.servicePackageService.createDeal(this.offerId, _package);
  // }

  public goCheckout(packageType) {
    if(this.token !== null) {
      this.extraFeaturesForm.addControl('packageTitle', this.fb.control(packageType));
      this.checkoutState.emit(this.extraFeaturesForm.value);
    } else {
      console.log("не авторизирован");
    }

    
  }

  public goCompareTable() {
    this.scrollToCompare.emit();
  }

  private checkUserToken() {
    this.token = this.localStorageService.getItem('token').value;
    if(this.token !== null) {
      this.notAuth = true;
    } else {
      this.notAuth = false;
    }
  }


  
}
