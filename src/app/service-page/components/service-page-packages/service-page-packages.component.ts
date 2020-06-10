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
  @Output() scrollToThis = new EventEmitter<any>();

  private token: any = null;
  public openFeatures = false;
  public extraFeaturesForm: FormGroup;
  public extraFeatures: any;
  private allowCheckout = null;

  @Input() offerData: OfferDataInterface;
  @Input() offerId;

  public currentTab: any = 0;
  public tabs = [
    {
      name: 'packages.basic'
    },
    {
      name: 'packages.premium'
    },
    {
      name: 'packages.standart'
    }
  ];
  public packages = [
    'basic',
    'advanced',
    'premium'
  ];

  constructor(
    private servicePageService: ServicePageService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.token = this.localStorageService.getItem('token').value;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.extraFeaturesForm = this.fb.group({
      extraTerms: [null],
      extraChanges: [null],
      extraCommercial: [null],
    });
    this.offerData.extra_features.forEach((el: any) => {
      if (el.published) {
        this.extraFeaturesForm.addControl(el.title, this.fb.control(null));
      }
    });
  }

  public openTab = (i: number) => {
    if (!this.offerData.allPackages) {
      this.currentTab = 0;
    } else {
      this.currentTab = i;
    }
  }

  public showFeatures() {
    this.openFeatures = !this.openFeatures;
  }

  public scrollToElement(id) {
    this.scrollToThis.emit(id);
  }

  public goCheckout(packageType) {
    this.checkAuthorized();
    if(this.allowCheckout) {
      this.extraFeaturesForm.addControl('packageTitle', this.fb.control(packageType));
      this.checkoutState.emit(this.extraFeaturesForm.value);
    }

  }

  private checkAuthorized() {
    if(this.token !== null) {
      this.servicePageService.setSpinnerState(false);
      this.allowCheckout = true;
    } else {
      this.servicePageService.setSpinnerState(true);
      this.allowCheckout = false;
    }
  }

}
