import { Component, OnInit } from '@angular/core';
import { UserOffersService } from '../../services/user-offers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { FileClass } from '../../classes/file.class';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { filter } from 'rxjs/operators';

import { plainToClass, Expose } from 'class-transformer';


@Component({
  selector: 'app-first-step-service-creation',
  templateUrl: './first-step-service-creation.component.html',
  styleUrls: ['./first-step-service-creation.component.scss']
})
export class FirstStepServiceCreationComponent implements OnInit {
  public categoryList: CategoryInterface[] = [];
  public firstStepForm: FormGroup;
  public userService: UserServiceModel;

  public categories = [];
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
    private _route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private _formConverter$: FileClass
  ) {
    this.userOffersService.getCategorys()
      .subscribe((res:any) => {
        
        this.categoryList = res.category;
        this._loadCategoriesFilter();
      });
  }

  ngOnInit() {
    if (this._route.snapshot.queryParams.offerId) {
      this.userOffersService.changeService(this._route.snapshot.queryParams)
        .pipe(
          filter((response: any) => !!response)
        )
        .subscribe(response => {
          this.userService = plainToClass(UserServiceModel, response.userOffer);
          // this._loadSubcategoryFilter()
          console.log(this.userService)
        })
    } else {
      this.userService = plainToClass(UserServiceModel, {}, { excludeExtraneousValues: true });

    }

    this.firstStepForm = this.fb.group({
      name: [null],
      category: [null],
      subCategory: [null, Validators.required],
      tags: [null],
      files: [null],
      step: 1
    });
  }
  onFiltersChange() {
    this._loadCategoriesFilter();
    this._loadSubcategoryFilter();
  }

  private _loadCategoriesFilter = () => {
    this.categories = this.categoryList;
  }

  private _loadSubcategoryFilter = () => {
    // if(!this.userService) {
    //    this.sub_categories = [];
    //   this.userService.subСategory = null;
    //   return
    // }
    if (!this.firstStepForm.value.category) {
      if(this.userService.category === undefined){
        this.sub_categories = [];
        this.userService.subСategory = null;
        return
      } else {
        const x: any = this.categoryList.find((d: any) => d.link === this.userService.category);
        this.sub_categories = x.sub_categories;
        return;
      }
    }
    
    const x: any = this.categoryList.find((d: any) => d.link === this.firstStepForm.value.category);
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
    reader.onload = (_event) => {
      this.previewUrl.push(reader.result);
    };
  }

}


