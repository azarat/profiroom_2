import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserSettingsService } from '../../../services/user-settings.service';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-user-settings',
  templateUrl: './education-user-settings.component.html',
  styleUrls: ['./education-user-settings.component.scss']
})
export class EducationUserSettingsComponent implements OnInit {

  @Input() userSettings: UserSettingsModel;

  // public educationForm: FormGroup;
  public submited = false;
  public openItem: number;

  files: any = [];
  fileNames: any = [];
  previewUrl: any;

  public yearsArr = [];
  public yearsFiltered = [];
  public academicDegrees = [1, 2, 3, 4, 5];

  constructor(
    private userSettingsService: UserSettingsService,
  ) {}

  ngOnInit() {
    this.createYears();
    this.openItem = this.userSettings.education.length;

    if (!this.userSettings.education.length) {
      this.addEducation();
    }
  }

  // --------------- create education-item -----------------//
  addEducation() {
    this.userSettings.education.push({
      institution: '',
      academicDegree: 1,
      specialty: '',
      startEducation: 1960,
      finishEducation: 1960,
      diplomaFiles: null
    });
    // this.submited = false;
    this.openItem = this.userSettings.education.length;
  }

  // --------------- delete education-item -----------------//
  deleteEducation(index: number) {
    this.userSettings.deleteEducation(index);
  }

  //  --------------- diploma photos uploading ---------------
  fileProgress = (event: any, i) => {
    const formData: FormData = new FormData();
    // formData.append('offerId', this.userSettings.id);
    this.files = [];
    this.fileNames = [];
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
    }
    // ------- put files in FormData -------//
    this.files.forEach((el: any) => {
      formData.append('diploma[]', el, el.name);
      this.fileNames.push(el.name);
    });
    // ------- load Files -----

    // ------- get fileName


    // this.userSettingsService
    //   .uploadDiplomaPhotos(formData)
    //   .subscribe((res: any) => {
    //     console.log(res)
    //     this.previewUrl = res.diploma;
    //   });
  }

  // fileProgress(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.form.get('avatar').setValue(file);
  //   }
  // }

  // --------------- delete files -----------------//
  deleteAttachment = (imgUrl: string) => {
    console.log(imgUrl);
    this.userSettingsService.deleteFile({ link: imgUrl }).subscribe((res: any) => {
      if (res.status === 'ok') {
        this.previewUrl = this.previewUrl.filter((el: string) => {
          return el !== imgUrl;
        });
      }
    });
  }

  // --------------- open single item -----------------//
  chooseItem(i) {
    if (this.openItem === i) {
      this.openItem = null;
    } else {
      this.openItem = i;
    }
  }

  // --------------- create years array-----------------//
  createYears() {
    for (let i = 1960; i <= 2019; i++) {
      this.yearsArr.push(i);
    }
  }

  // --------------- save changes -----------------//
  onSubmit(form) {
    this.submited = true;
    if (form.invalid) {
      console.log('invalid');
      return;
    }
    this.addEducation();
  }
}
