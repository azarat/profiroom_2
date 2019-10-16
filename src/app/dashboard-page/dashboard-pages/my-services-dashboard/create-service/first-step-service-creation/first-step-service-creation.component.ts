import { Component, OnInit } from '@angular/core';
import { OfferCreationService } from '../../services/offer-creation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-step-service-creation',
  templateUrl: './first-step-service-creation.component.html',
  styleUrls: ['./first-step-service-creation.component.scss']
})
export class FirstStepServiceCreationComponent implements OnInit {
  public categoryList: [] = null;
  public firstStepForm: FormGroup;

  constructor(
    private offerCreationService: OfferCreationService,
    private fb: FormBuilder,
  ) {
    this.offerCreationService.getCategorys()
    .subscribe(res => {
      console.log(res)
      this.categoryList = res;
    })
   }

  ngOnInit() {
    this.firstStepForm = this.fb.group({
      serviceTitle: '' ,
      serviceCategory: '',
      serviceSubCategory: ''
    });
  }

}
