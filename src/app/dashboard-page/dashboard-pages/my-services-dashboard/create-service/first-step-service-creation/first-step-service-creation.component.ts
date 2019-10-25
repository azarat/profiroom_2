import { Component, OnInit } from '@angular/core';
import { UserOffersService } from '../../services/user-offers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { FileClass } from '../../classes/file.class';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  files = [];
  previewUrl = [];
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private userOffersService: UserOffersService,
    private fb: FormBuilder,
    private http: HttpClient,
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _formConverter$: FileClass
  ) {
    this.userOffersService.getCategorys()
      .subscribe((res: CategoryInterface) => {
        this.categoryList = res;
        this._loadCategoriesFilter();
      });
  }

  ngOnInit() {



    this.firstStepForm = this.fb.group({
      name: [null],
      category: [null],
      subcategory: [null, Validators.required],
      tags: [null],
      step: 1
    });

    this.userOffersService.userOffer$
      .subscribe(servData => {
        if (servData) {

          console.log(servData.userOffers);
          this.firstStepForm = servData.userOffers;
          console.log(this.firstStepForm );
        }
      });
  }
  onFiltersChange() {
    this._loadCategoriesFilter();
    this._loadSubcategoryFilter();

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
    const x: any = this.categoryList.category.find((d: any) => d.link === this.firstStepForm.value.category);
    this.sub_categories = x.sub_categories;
  }

  registrate = () => {
    const formData: FormData = new FormData();

    for (const key of Object.keys(this.firstStepForm.value)) {
      formData.append(key, this.firstStepForm.value[key]);
    }
    // ------- put files in FormData -------//
    this.files.forEach(el => {
      formData.append('filesname[]', el, el.name);
    });


    this.userOffersService.serviceCreation(formData).subscribe(
      (res: object) => {
        if (res) {
          this.setQuerryParams(res);
        }
      }
    );
  }

  // ------------- put offerId in params -----------//

  private setQuerryParams(obj: object) {
    this.router.navigate(['./second-step'], {
      relativeTo: this.activatedRoute,
      queryParams: obj,
      queryParamsHandling: 'merge',
    });
  }

  //  --------------- file uploading ---------------

  fileProgress = (event: any) => {

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
      this.preview(event[index]);
    }
  }

  preview = (el) => {
    if (el.type.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(el);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.previewUrl.push(reader.result);
    };
  }

}


