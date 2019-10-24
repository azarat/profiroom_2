import { Component, OnInit } from '@angular/core';
import { OfferCreationService } from '../../services/offer-creation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { FileClass } from '../../classes/file.class';

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

  files: File = null;
  previewUrl = [];
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private offerCreationService: OfferCreationService,
    private fb: FormBuilder,
    private http: HttpClient,
    // tslint:disable-next-line: variable-name
    private _formConverter$: FileClass
  ) {
    this.offerCreationService.getCategorys()
      .subscribe((res: CategoryInterface) => {
        this.categoryList = res;
        this._loadCategoriesFilter();
      });
  }

  ngOnInit() {
    this.firstStepForm = this.fb.group({
      name: [null],
      category: [null],
      subCategory: [null, Validators.required],
      tags: [null],
      photos: null
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
    const x: any = this.categoryList.category.find((d: any) => d.id === this.firstStepForm.value.category);
    this.sub_categories = x.sub_categories;
  }




  registrate = () => {
    const formData: FormData = new FormData();
    formData.append('photos', this.files, this.files.name );
    // tslint:disable-next-line: forin
    for (const key in this.firstStepForm.value) {
      formData.append(key, this.firstStepForm.value[key]);
    }
    formData.append('photos', this.files, this.files.name );
    console.log(formData);
    // const result = this._formConverter$.fromGroupToGroupData(this.firstStepForm.value);
    // console.log(result);
    // const formData = new FormData();
    // formData.append('file', this.files);

    this.offerCreationService.offerCreation(formData).subscribe(
      res => {
    console.log(formData);
      }
    );
  }


  //  --------------- file uploading ---------------

  fileProgress = (event: any) => {


    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      // this.files.push(event);
      this.preview(event[index]);
      // console.log(event);
    }
    this.files = event.item(0);
    // this.firstStepForm.get('photos').setValue(this.files);
    console.log(this.files);


  }

  // this.fileData = fileInput.target.files[0] as File;


  preview = (el) => {
    //   // Show preview

  // this.files.forEach(el => {
    if (el.type.match(/image\/*/) == null) {
      return;
    }


    const reader = new FileReader();
    // console.log(el);
    // console.log();

    reader.readAsDataURL(el);
     // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
          // console.log(reader.result)
          this.previewUrl.push(reader.result);
        };
  }

  }


