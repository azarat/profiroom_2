import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OfferDataInterface } from 'src/app/shared/interfaces/offer-date.interface';
import { ServicePageService } from '../../services/service-page.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-service-page-compare-table',
  templateUrl: './service-page-compare-table.component.html',
  styleUrls: ['./service-page-compare-table.component.scss']
})
export class ServicePageCompareTableComponent implements OnInit {
  
  @Output() checkoutState = new EventEmitter<any>();
  @Output() scrollToThis = new EventEmitter<any>();
  @Input() offerData: OfferDataInterface;

  private token: any = null;
  private allowCheckout = null;
  public packages = [
    'basic',
    'advanced',
    'premium'
  ];
  public services = [
    {
      serviceName: 'service-page.compare-tab-service-name',
      serviceValue: 'title',
      centerMode: 0
    },
    {
      serviceName: 'service-page.compare-tab-short-description',
      serviceValue: 'description',
      centerMode: 0
    },
    {
      serviceName: 'service-page.compare-deadline',
      serviceValue: 'term',
      centerMode: 1,
      extraWord: "days"
    },
    {
      serviceName: 'service-page.compare-number-of-edits',
      serviceValue: 'changes',
      centerMode: 1,
      extraWord: "corrections"
    }
  ];

  public extraFeaturesForm: FormGroup;
  public extraFeatures: any;

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

  public goCheckout(packageType) {
    this.checkAuthorized();
    if(this.allowCheckout) {
      this.extraFeaturesForm.addControl('packageTitle', this.fb.control(packageType));
      this.checkoutState.emit(this.extraFeaturesForm.value);
      console.log(packageType);
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
  
  public scrollToElement(id) {
    this.scrollToThis.emit(id);
  }
}
