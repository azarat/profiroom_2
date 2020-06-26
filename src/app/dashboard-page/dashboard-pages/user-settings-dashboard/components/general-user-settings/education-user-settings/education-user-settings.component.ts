import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserSettingsService } from '../../../services/user-settings.service';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-user-settings',
  templateUrl: './education-user-settings.component.html',
  styleUrls: ['./education-user-settings.component.scss']
})
export class EducationUserSettingsComponent implements OnInit  {

  @Input() userSettings: UserSettingsModel;
  @Input() closeAfterSaveSettings: boolean;
  @Input() formSubmitted: boolean;

  private educationId: number;
  // public educationForm: FormGroup;
  public submited = false;
  public openItem: number;

  files: any = [];
  previewUrl: any;

  public yearsArr = [];
  public yearsFinishArr = [];

  public academicDegrees = [1, 2, 3, 4, 5];
  public academicDegreesTranslations = [
    "academicDegrees.lvl1",
    "academicDegrees.lvl2",
    "academicDegrees.lvl3",
    "academicDegrees.lvl4",
    "academicDegrees.lvl5"
  ];

  constructor(
    private userSettingsService: UserSettingsService,
  ) {}

  ngOnInit() {
    this.createYearsFinished(1960);
    this.createYears(2020);
    this.openItem = null;
  }

  // --------------- create education-item -----------------//
  addEducation() {
    this.userSettingsService.newEducationId().subscribe(
      (res: any) => {
        this.educationId = res.data[0].id;

        if (this.educationId) {
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
    this.openItem = this.userSettings.education.length + 1;

  }

  // --------------- delete education-item -----------------//
  deleteEducation(deletedEducation: number, i) {

    const educationId = {
      id: deletedEducation
    };
    this.userSettingsService.deleteEducationID(educationId).subscribe((res: any) => {});
    this.userSettings.deleteEducation(i);
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

      if(this.userSettings.education[i].diploma == undefined) {
        this.userSettings.education[i].diploma = [];
      }
      this.userSettings.education[i].diploma.push(this.previewUrl);
    });


  }

  public deleteDiplomaPhoto(imgName, institutIndex, imgIndex){

    this.userSettingsService.deleteFile({link: imgName})
    .subscribe((res: any) => {
      console.log(res);
      this.userSettings.education[institutIndex].diploma.splice(imgIndex, 1);
    });

  }

  // --------------- open single item -----------------//
  chooseItem(i) {
    if (this.openItem === i) {
      this.openItem = null;
    } else {
      this.openItem = i;
      this.closeAfterSaveSettings = false;
    }
  }

  // --------------- create years array-----------------//
  createYears(limit) {
    this.yearsArr = [];
    for (let i = 1960; i <= limit; i++) {
      this.yearsArr.push(i);
    }
  }

  // --------------- create years finish array-----------------//
  createYearsFinished(limit) {
    this.yearsFinishArr = [];
    for (let i = limit; i <= 2027; i++) {
      this.yearsFinishArr.push(i);
    }
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
