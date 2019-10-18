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

  fileData: File = null;
  previewUrl = [];
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private offerCreationService: OfferCreationService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.offerCreationService.getCategorys()
      .subscribe((res: CategoryInterface) => {
        console.log(res)
        this.categoryList = res;
        this._loadCategoriesFilter();
      });
  }

  ngOnInit() {
    this.firstStepForm = this.fb.group({
      serviceTitle: [null],
      category: [null],
      subcategory: [null, Validators.required],
      tags: [null],
      gallery: [null]
    });
  }
  onFiltersChange() {
    this._loadCategoriesFilter();
    this._loadSubcategoryFilter();
    console.log(this.sub_categories);
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
    const x: any = this.categoryList.category.find((d: any) => d.id === this.firstStepForm.value.category)
    this.sub_categories = x.sub_categories;
  }




  registrate = () => {

  }


  //  --------------- file uploading ---------------

  fileProgress = (fileInput: any) => {
    console.log(fileInput)
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview = () => {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      // console.log(reader.result)
      this.previewUrl.push(reader.result);
    }
  }

}
