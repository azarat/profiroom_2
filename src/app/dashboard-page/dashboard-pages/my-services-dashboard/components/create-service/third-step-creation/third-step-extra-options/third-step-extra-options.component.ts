import { Component, OnInit, Input } from '@angular/core';
import { UserServiceModel } from 'src/app/models/user-service.model';

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
  ngOnInit() {}

  changesArrayCounter() {
    const changes = new Array();
    for (let i = 1; i <= 30; i++) {
      changes.push(i);
    }
    return changes;
  }
    // *********************** Extra optins functions *******************//

    addExtraOptin() {
      this.userService.extra_features.push({
        optionPublish: true,
        optionTitle: null,
        optionDescription: null,
        optionPrice: null,
        optionCountDays: null
      });
      if (this.userService.extra_features.length > 1) {
        this.expandedOption = this.userService.extra_features.length;
      }
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

}
