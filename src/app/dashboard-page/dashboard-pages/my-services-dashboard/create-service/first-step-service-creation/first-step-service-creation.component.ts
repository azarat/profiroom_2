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

  files: any = [];
  previewUrl: any;


  constructor(
    private userOffersService: UserOffersService,
    private fb: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    private _route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userOffersService.getCategorys()
      .subscribe((res: any) => {

        this.categoryList = res.category;
        this._loadCategoriesFilter();
      });
  }

  ngOnInit() {
    this.getUserService();

    this.firstStepForm = this.fb.group({
      name: [null],
      category: [null],
      subCategory: [null, Validators.required],
      tags: [null],
      files: null,
      step: 1
    });
  }

  //  ** load userServiceData from server
  getUserService() {
    let request
    if (this._route.snapshot.queryParams.offerId) {
      request = this._route.snapshot.queryParams;

    } else {
      request = {
        offerId: 0
      }
    }
    this.userOffersService.getServiceData(request)
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {
        this.userService = plainToClass(UserServiceModel, response.userOffer);
        console.log(this.userService)
        if(this.userService.files){
          this.previewUrl = this.userService.files

        }
      })
    
  }


  onFiltersChange() {
    this._loadCategoriesFilter();
    this._loadSubcategoryFilter();
  }

  private _loadCategoriesFilter = () => {
    this.categories = this.categoryList;
  }

  private _loadSubcategoryFilter = () => {

    if (!this.firstStepForm.value.category) {
      if (this.userService.category === undefined) {
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
    this.userOffersService.serviceCreation(this.firstStepForm.value).subscribe(
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
    const formData: FormData = new FormData();
    console.log(this.userService.id);
    formData.append('offerId', this.userService.id);
    this.files = new Array;
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
    }
    // ------- put files in FormData -------//
    this.files.forEach(el => {
      formData.append('filesname[]', el, el.name);
    });

    // ------- load Files -----

    this.userOffersService.uploadFiles(formData)
      .subscribe((res: []) => {
        this.previewUrl = res;
        console.log(res)
      })
  }


  // --------------- delete files -----------------//

  deleteAttachment(index) {
    this.userOffersService.deleteFile({ id: index })
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == 'ok') {

          this.previewUrl = this.previewUrl.filter((obj: any) => {
            return obj.id !== index;
          })
        }

      })
  }

}
