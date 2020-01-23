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
  public academicDegreesTranslations = [
    'Бакалавр',
    'Магистр',
    'Доцент',
    'Профессор',
    'Владыка ситхов'
  ];

  constructor(
    private userSettingsService: UserSettingsService,
  ) {}

  ngOnInit() {
    this.createYears();
    this.openItem = this.userSettings.education.length;

    // if (!this.userSettings.education.length) {
    //   this.addEducation();
    // }
    // console.log(this.userSettings);
  }

  // --------------- create education-item -----------------//
  addEducation() {
    this.userSettingsService.newEducationId().subscribe(
      (res: any) => {
        this.educationId = res.data[0].id;

        if (this.educationId) {

          console.log('create-new-aducation-id ', this.educationId);
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
      }
    );


    // this.educationId.subscribe


    console.log('create-new-aducation ', this.userSettings.education);
    this.openItem = this.userSettings.education.length + 1;

  }

  // --------------- delete education-item -----------------//
  deleteEducation(deletedEducation: number, i) {

    const educationId = {
      id: deletedEducation
    };

    this.userSettings.deleteEducation(i);
    this.userSettingsService.deleteEducatioon(educationId).subscribe(
      (res: any) => {
        console.log(res);
      });
    console.log('create-new-aducation ', this.userSettings.education);
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

    this.userSettingsService.uploadDiplomaPhotos(formData)
    .subscribe((res: any) => {
      this.previewUrl = res.diploma[0].url;


      this.userSettings.education[i].diploma.push(this.previewUrl);
    });
    console.log(this.userSettings);
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
    this.submited = false;
    // console.log(this.institution.valid);
  }

}
