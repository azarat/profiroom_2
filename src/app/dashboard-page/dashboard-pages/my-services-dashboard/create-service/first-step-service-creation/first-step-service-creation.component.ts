import { Component, OnInit } from '@angular/core';
import { OfferCreationService } from '../../services/offer-creation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';

@Component({
  selector: 'app-first-step-service-creation',
  templateUrl: './first-step-service-creation.component.html',
  styleUrls: ['./first-step-service-creation.component.scss']
})
export class FirstStepServiceCreationComponent implements OnInit {
  public categoryList: CategoryInterface;
  public firstStepForm: FormGroup;
  public userServiceForm: UserServiceModel;

  public categories = [];
  // tslint:disable-next-line: variable-name
  public sub_categories = [];

  constructor(
    private offerCreationService: OfferCreationService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.offerCreationService.getCategorys()
    .subscribe((res: CategoryInterface) => {
      console.log(res);
      this.categoryList = res;



      this._loadCategoriesFilter();
    });
   }

  ngOnInit() {
    this.firstStepForm = this.fb.group({
      serviceTitle: [''] ,
      category: [''],
      subcategory: ['']
    });
    // this.userServiceForm.category = null;
    // this.userServiceForm.subcategory = null;
    this.onFiltersChange();
  }
  onFiltersChange() {


  }

  // tslint:disable-next-line: variable-name
  private _loadCategoriesFilter = () => {
    this.categories = this.categoryList.category;
  }

  // tslint:disable-next-line: variable-name
  private _loadSubcategoryFilter = () => {
    if (!this.firstStepForm.value.category) {
      this.sub_categories = [];
      this.firstStepForm.value.subcategory = null;
      return;
    }
  }


  // onCategoryChange = () => {
  // console.log(this.firstStepForm.value.category)
  // }

  registrate = () => {

  }

}
