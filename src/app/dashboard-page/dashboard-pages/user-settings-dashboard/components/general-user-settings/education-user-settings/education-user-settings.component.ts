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

  private educationId: number;
  // public educationForm: FormGroup;
  public submited = false;
  public openItem: number;

  files: any = [];
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
    // console.log(this.userSettings);
  }

  // --------------- create education-item -----------------//
  addEducation() {
    this.userSettingsService.newEducationId().subscribe(
      (res: any) => {
        this.educationId = res.data[0].id;
        // console.log(this.educationId);
      }
    );

    if (this.educationId) {
      console.log("create-new-aducation-id ", this.educationId);
      this.userSettings.education.push({
        id: this.educationId,
        institution: '',
        academicDegree: 1,
        specialty: '',
        startEducation: 1960,
        finishEducation: 1960,
        diploma: []
      });
    }

    console.log("create-new-aducation ", this.userSettings.education);
    this.openItem = this.userSettings.education.length;
  }

  // --------------- delete education-item -----------------//
  deleteEducation(index: number) {
    this.userSettings.deleteEducation(index);
  }

  //  --------------- diploma photos uploading ---------------
  fileProgress = (event: any, id: any, i: number) => {

    const formData: FormData = new FormData();
    this.files = [];

    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
    }

    this.files.forEach((el: any) => {
      formData.append('filesname[]', el, el.name);
    });

    formData.append('educaionId', id);

    this.userSettingsService.uploadDiplomaPhotos(formData)
    .subscribe((res: any) => {
      this.previewUrl = res.diploma[0].url;

      console.log(this.previewUrl);
      this.userSettings.education[i].diploma.push(this.previewUrl);
    });
  }



  // --------------- delete files -----------------//
  deleteImg = (indexEducationArr: number, indexImgArr: number) => {
    // console.log(indexEducationArr);
    // this.userSettings.education[indexEducationArr].diplomaFiles.splice(indexImgArr, 1);
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
