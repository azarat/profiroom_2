import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserOffersService } from '../../services/user-offers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { filter } from 'rxjs/operators';

import { plainToClass, Expose } from 'class-transformer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


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
  // tslint:disable-next-line: variable-name
  public sub_categories = [];

  files: any = [];
  previewUrl: any;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [
    // {name: 'Lemon'},
    // {name: 'Lime'},
    // {name: 'Apple'},
  ];


  constructor(
    private userOffersService: UserOffersService,
    private fb: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userOffersService.getCategorys()
      .subscribe((res: any) => {
        this.categoryList = res.category;
        console.log(this.categoryList)
        // this._loadCategoriesFilter();
      });
  }

  ngOnInit() {
    this.getUserService();

    this.firstStepForm = this.fb.group({
      name: [null],
      category: [null],
      subCategory: [null, Validators.required],
      tags: [null],
      step: 1
    });
  }

  // ** stop observables
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
  }

  //  ** load userServiceData from server
  getUserService() {
    let request: object;
    if (this._route.snapshot.queryParams.offerId) {
      request = this._route.snapshot.queryParams;

    } else {
      request = {
        offerId: 0
      };
    }
    this.userOffersService.getServiceData(request)
      .pipe(
        filter((response: any) => !!response)
      )
      .subscribe(response => {
        this.userService = plainToClass(UserServiceModel, response.userOffer);
        console.log(this.userService)
        if (this.userService.files) {
          this.previewUrl = this.userService.files;
        }
      });

  }


  onFiltersChange() {
    // this._loadCategoriesFilter();
    this._loadSubcategoryFilter();
  }

  // tslint:disable-next-line: variable-name
  // private _loadCategoriesFilter = () => {
  //   this.categories = this.categoryList;
  // }

  // tslint:disable-next-line: variable-name
  private _loadSubcategoryFilter = () => {
    if (!this.firstStepForm.value.category && !this.userService.subCategory) {
      this.sub_categories = [];
      // this.userService.subCategory = null;
      return;
    } else if (this.userService.subCategory && !this.firstStepForm.value.category) {
      console.log(this.categoryList)
      const x: any = this.categoryList.find((d: any) => d.link === this.userService.category);
      this.sub_categories = x.sub_categories;
      return;
    } else {

      const x: any = this.categoryList.find((d: any) => d.link === this.firstStepForm.value.category);
      this.sub_categories = x.sub_categories;
    }
  }

  // if (!this.firstStepForm.value.category) {
  //   console.log(this.firstStepForm.value.category);
  //   console.log(this.userService.category);
  //   if (this.userService.category) {
  //     console.log('test2');
  //     this.sub_categories = [];
  //     this.userService.subСategory = null;
  //     return;
  //   } else {

  //     // tslint:disable-next-line: no-shadowed-variable
  //     const x: any = this.categoryList.find((d: any) => d.link === this.userService.category);

  //     this.sub_categories = x.sub_categories;
  //     return;
  //   }
  // }
  // console.log('test3');
  // const x: any = this.categoryList.find((d: any) => d.link === this.firstStepForm.value.category);
  // this.sub_categories = x.sub_categories;


registrate = () => {
  this.userOffersService.serviceCreation(this.firstStepForm.value).subscribe(
    (res: object) => {
      if (res) {
        this.setQuerryParams(res);
        // console.log(res);
      }
    }
  );
}

  // ------------- put offerId in params -----------//

  private setQuerryParams(obj: object) {
  this.router.navigate([this.router.url], {
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
  this.files = [];
  for (let index = 0; index < event.length; index++) {
    this.files.push(event[index]);
  }
  // for (const index of event.length) {
  //   this.files.push(event[index]);
  // }
  // ------- put files in FormData -------//
  this.files.forEach((el: any) => {
    formData.append('filesname[]', el, el.name);
  });

  // ------- load Files -----

  this.userOffersService.uploadFiles(formData)
    .subscribe((res: []) => {
      this.previewUrl = res;
    });
}


// --------------- delete files -----------------//

deleteAttachment(index: number) {
  this.userOffersService.deleteFile({ id: index })
    .subscribe((res: any) => {
      console.log(res);
      if (res.status === 'ok') {

        this.previewUrl = this.previewUrl.filter((obj: any) => {
          return obj.id !== index;
        });
      }

    });
}

// ------------ tag-chips----------------------------//
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add our fruit
  if ((value || '').trim()) {
    this.tags.push({name: value.trim()});
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }
}

remove(tag): void {
  const index = this.tags.indexOf(tag);

  if (index >= 0) {
    this.tags.splice(index, 1);
  }
}

}
