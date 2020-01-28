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
  public submited = false;
  public mounth = [];
  public openItem: number;

  files: any = [];
  previewUrl: any;

  private additionalEducationId: number;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit() {
    this.createMountArray();
    this.openItem = this.userSettings.additionalEducation.length;
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

  // --------------- create education-item -----------------//
  addEducation() {
    this.userSettingsService.newAdditioanlEducationId().subscribe(
      (res: any) => {
        this.additionalEducationId = res.data[0].id;
        if (this.additionalEducationId) {
          this.userSettings.additionalEducation.push({
            id: this.additionalEducationId,
            additionalInstitution: 'Учебное заведение',
            courseName: 'Название курсов',
            startStudyMounth: 1,
            startStudyYear: 1960,
            endStudyMounth: 1,
            endStudyYear: 1960,
            additionalDiploma: []
          });
        }

      }
    );
    this.openItem = this.userSettings.additionalEducation.length + 1;
  }

  // --------------- delete education-item -----------------//
  deleteEducation(deletedEducation: number, i) {
    const educationId = {
      id: deletedEducation
    };

    this.userSettings.deleteAdditionalEducation(i);
    this.userSettingsService.deleteEducatioon(educationId);
  }

  chooseItem(i) {
    if (this.openItem === i ) {
      this.openItem = null;
    } else {
      this.openItem = i;
    }
  }

  //  --------------- diploma photos uploading ---------------
  fileProgress = (event: any, id: any, i: number) => {
    const formData: FormData = new FormData();
    this.files = [];

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
    }

    this.files.forEach((el: any) => {
      formData.append('filesname[]', el, el.name);
    });

    formData.append('id', id);

    this.userSettingsService.uploadAdditionalDiplomaPhotos(formData)
    .subscribe((res: any) => {
      this.previewUrl = res.additionalDiploma[0].url;


      this.userSettings.additionalEducation[i].additionalDiploma.push(this.previewUrl);
    });
  }

  // --------------- save changes -----------------//
  onSubmit(form) {
    this.submited = true;
    if (form.invalid) {
      return;
    }
    this.addEducation();
    this.submited = false;
  }

}
