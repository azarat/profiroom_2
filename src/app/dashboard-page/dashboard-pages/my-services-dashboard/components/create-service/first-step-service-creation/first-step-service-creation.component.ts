import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/shared/interfaces/category.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceModel } from 'src/app/models/user-service/user-service.model';
import { filter, first } from 'rxjs/operators';

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
  tags: {tag: string}[] = [];


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

    console.log(this.userService)
    this.userOffersService.getCategorys()
      .pipe(
        filter((res: any) => !!res),
        first()
      )
      .subscribe((res: any) => {
        this.categoryList = res.category;
        if ( this.userService.category ) {
          this.loadSubcategoryFilter(this.userService.category)
        }
      });

    if (this.userService.files) {
      this.previewUrl = this.userService.files;
    }
    this.tags = this.userService.tags;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
  }

  onFiltersChange() {
    console.log(this.userService.category);
    // this._loadSubcategoryFilter();
  }

  // tslint:disable-next-line: variable-name
  public loadSubcategoryFilter = (category: string) => {
    const x: any = this.categoryList.find((d: any) => d.link === category);
    this.sub_categories = x.sub_categories;
    console.log(this.categoryList)
    return;
  }

  registrate = () => {
    this.userService.tags = this.tags;
    console.log(this.userService)
    this.userOffersService.updateService(this.userService)
    .pipe(filter((res: any) => !! res))
    .subscribe(
      (res) => {
        this.userService.step = res.step;
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

//  ----------  choose Main OfferPhoto  ----------

putAsMainPhoto(link: string) {
  this.userService.offerMainImage = link;
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
