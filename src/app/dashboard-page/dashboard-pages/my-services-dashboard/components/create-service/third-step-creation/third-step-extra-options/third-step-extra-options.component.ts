import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-services/user-service.model';

@Component({
  selector: 'app-third-step-extra-options',
  templateUrl: './third-step-extra-options.component.html',
  styleUrls: ['./third-step-extra-options.component.scss']
})
export class ThirdStepExtraOptionsComponent implements OnInit {

  public expandedOption = 1;
  public optionsVisible = false;
  constructor() { }

  @Input() userService: UserServiceModel;
  @Input() submited: boolean;
  ngOnInit() {
    // this.setDefaultCheckboxes();
  }

  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }
    // *********************** Extra optins functions *******************//

    addExtraOption() {
      this.userService.extra_features.push({
        optionPublish: true,
        optionTitle: null,
        optionDescription: null,
        optionPrice: null,
        optionCountDays: null
      });
      if (this.userService.extra_features.length > 1) {
        this.expandedOption = this.userService.extra_features.length;
      } else {
        this.expandedOption = this.userService.extra_features.length;
      }
    }

    public hideExtraOption(id) {
      this.userService.removeExtraOption(id);
      this.expandedOption = null;
    }

    deleteExtraOption(index: number) {
      this.userService.removeExtraOption(index);
      if (this.expandedOption > index ) {
        this.expandedOption = this.expandedOption - 1;
      }

    }

    changeOption(index) {
      this.expandedOption = index;
    }

    showOptions() {
      this.optionsVisible = !this.optionsVisible;
    }

    // private setDefaultCheckboxes() {
    //   this.userService.commercialOffer.publishCommercialOffer = false;
    //   this.userService.extraOfferChanges.publishExtraOfferChanges = false;
    //   this.userService.compressedDeadlines.publishCompressedDeadlines
    //    = false;
    // }
}
