import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { filter } from 'rxjs/operators';

import { plainToClass, Expose } from 'class-transformer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UserOffersService } from '../../../services/user-offers.service';
// import { EventEmitter } from 'events';


@Component({
  selector: 'app-first-step-service-creation',
  templateUrl: './first-step-service-creation.component.html',
  styleUrls: ['./first-step-service-creation.component.scss']
})
export class FirstStepServiceCreationComponent implements OnInit {
  public categoryList: CategoryInterface[] = [];
  public firstStepForm: FormGroup;

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
  tags = [];


  constructor(
    private userOffersService: UserOffersService,
    private fb: FormBuilder,
    public translate: TranslateService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) { }

  @Input() userService: UserServiceModel;
  @Output() public setCurrentStep = new EventEmitter();

  ngOnInit() {


    this.userOffersService.getCategorys()
      .pipe(filter((res: any) => !!res))
      .subscribe((res: any) => {
        this.categoryList = res.category;
        this._loadSubcategoryFilter();
      });

    if (this.userService.files) {
      this.previewUrl = this.userService.files;
    }
    this.tags = this.userService.tags;

    this.firstStepForm = this.fb.group({
      title: [null],
      category: [null],
      subCategory: [null, Validators.required],
      tags: [null],
      step: 1,
      offerId: null
    });

    console.log(this.userService);
    console.log(this.firstStepForm.value)
  }

  // ** stop observables
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
  }


  onFiltersChange() {
    if (this.categoryList.length > 0) {
      this._loadSubcategoryFilter();
    }
  }

  // tslint:disable-next-line: variable-name
  private _loadSubcategoryFilter = () => {
    if (!this.firstStepForm.value.category && !this.userService.subCategory) {
      this.sub_categories = [];
      // this.userService.subCategory = null;
      return;
    } else if (this.userService.subCategory && !this.firstStepForm.value.category) {
      const x: any = this.categoryList.find((d: any) => d.link === this.userService.category);
      this.sub_categories = x.sub_categories;
      return;
    } else {
      const x: any = this.categoryList.find((d: any) => d.link === this.firstStepForm.value.category);
      this.sub_categories = x.sub_categories;
    }
  }

  registrate = () => {
    this.firstStepForm.value.offerId = this.userService.id;
    this.firstStepForm.value.tags = this.tags;
    console.log(this.userService);
    console.log(this.firstStepForm.value)
    // this.userOffersService.updateService(this.firstStepForm.value)
    // .pipe(filter((res: any) => !! res))
    // .subscribe(
    //   (res) => {
    //     this.setCurrentStep.emit(2);
    //   }
    // );
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
    formData.append('offerId', this.userService.id);
    this.files = [];
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
    }
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
      this.tags.push({ tag: value.trim() });
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
