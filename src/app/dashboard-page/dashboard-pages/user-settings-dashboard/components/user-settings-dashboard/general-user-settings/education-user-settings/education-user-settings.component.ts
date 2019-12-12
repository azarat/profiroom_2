import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserDashboardSettingsService } from '../../../../services/user-dashboard-settings.service';

@Component({
  selector: 'app-education-user-settings',
  templateUrl: './education-user-settings.component.html',
  styleUrls: ['./education-user-settings.component.scss']
})
export class EducationUserSettingsComponent implements OnInit {
  @Input() userSettings: UserSettingsModel;
  files: any = [];
  previewUrl: any;
  // public academicDegrees = [
  //   'Молодший спеціаліст',
  //   'Бакалавр',
  //   'Спеціаліст',
  //   'Магістр'
  // ];

  public academicDegrees = [1, 2, 3, 4, 5];

  constructor(
    private userDashboardSettingsService: UserDashboardSettingsService,
  ) {}

  ngOnInit() {}

  createYears() {
    const years = [];
    for (let i = 1960; i <= 2019; i++) {
      years.push(i);
    }
    return years;
  }

  addEducation() {
    this.userSettings.education.push({
      institution: null,
      academicDegree: null,
      specialty: null,
      startEducation: null,
      finishEducation: null,
      diplomaFiles: null
    });
  }

  deleteEducation(index: number) {
    this.userSettings.deleteEducation(index);
  }

  //  --------------- file uploading ---------------
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

    this.userDashboardSettingsService.uploadFiles(formData)
      .subscribe((res: []) => {
        this.previewUrl = res;
      });
  }
}
