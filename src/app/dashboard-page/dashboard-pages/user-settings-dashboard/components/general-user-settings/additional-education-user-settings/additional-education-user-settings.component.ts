import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-additional-education-user-settings',
  templateUrl: './additional-education-user-settings.component.html',
  styleUrls: ['./additional-education-user-settings.component.scss']
})
export class AdditionalEducationUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;
  public mounth = [];
  public openItem: number = 0;
  files: any = [];
  previewUrl: any;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit() {
    this.createMountArray();
    // this.createYearArray();
  }
  createMountArray() {
    for (let i = 1; i <= 12; i++) {
      this.mounth.push(i);
    }
  }
  createYearArray() {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1960; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  }

  addEducation(i) {
    this.userSettings.additionalEducation.push({
      additionalInstitution: null,
      courseName: null,
      startStudyMounth: null,
      startStudyYear: null,
      endStudyMounth: null,
      endStudyYear: null,
      additionalDiplomaFiles: null
    });
    this.openItem = i;
  }

  deleteEducation(index: number) {
    this.userSettings.deleteAdditionalEducation(index);
  }

  chooseItem(i) {
    if (this.openItem === i ) {
      this.openItem = null;
    } else {
      this.openItem = i;
    }
  }

  fileProgress = (event: any) => {
    const formData: FormData = new FormData();
    formData.append('offerId', this.userSettings.id);
    this.files = [];
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
      console.log(this.files);
    }
    // ------- put files in FormData -------//
    this.files.forEach((el: any) => {
      formData.append('filesname[]', el, el.name);
      console.log(formData);
    });
    // ------- load Files -----

    this.userSettingsService.uploadAdditionalDiplomaPhotos(formData)
      .subscribe((res: []) => {
        this.previewUrl = res;
      });
  }
}
