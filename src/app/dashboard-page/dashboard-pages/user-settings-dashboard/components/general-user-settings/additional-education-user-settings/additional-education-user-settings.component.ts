import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-additional-education-user-settings',
  templateUrl: './additional-education-user-settings.component.html',
  styleUrls: ['./additional-education-user-settings.component.scss']
})
export class AdditionalEducationUserSettingsComponent implements OnInit, OnChanges {

  @Input() userSettings: UserSettingsModel;
  @Input() closeAfterSaveSettings = false;
  public submited = false;
  public month = [];
  public monthTranslate = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  public openItem: number;

  public yearsArr = [];
  public yearsFinishArr = [];

  files: any = [];
  previewUrl: any;

  private additionalEducationId: number;

  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit() {
    this.createYearArray(new Date().getFullYear()+5);
    this.createFinishYearArray(1960);
    this.createMonthArray();
    // this.openItem = this.userSettings.additionalEducation.length;
    this.openItem = null;
  }

  ngOnChanges() {
    this.closeAfterSaveSettings ? this.openItem = null: this.openItem = this.userSettings.education.length;
  }

  createMonthArray() {
    for (let i = 1; i <= 12; i++) {
      this.month.push(i);
    }
  }
  createYearArray(limit) {
    if(limit === 0) return
    this.yearsArr = [];
    for (let i = 1960; i <= limit; i++) {
      this.yearsArr.push(i);
    }
    return this.yearsArr;
  }

  createFinishYearArray(limit) {
    this.yearsFinishArr = [];
    const currentYear = new Date().getFullYear();
    for (let i = limit; i <= currentYear + 5; i++) {
      this.yearsFinishArr.push(i);
    }
    return this.yearsFinishArr;
  }

  // --------------- create education-item -----------------//
  addAdditionalEducation() {
    this.userSettingsService.newAdditioanlEducationId().subscribe(
      (res: any) => {
        this.additionalEducationId = res.data[0].id;
        if (this.additionalEducationId) {
          this.userSettings.additionalEducation.push({
            id: this.additionalEducationId,
            additionalInstitution: '',
            courseName: '',
            startStudyMonth: 1,
            startStudyYear: 1960,
            endStudyMonth: 1,
            endStudyYear: 1960,
            additionalDiploma: []
          });
        }

      }
    );
    this.openItem = this.userSettings.additionalEducation.length + 1;
    this.files = [];
  }

  // --------------- delete education-item -----------------//
  deleteEducation(deletedEducation: number, i) {
    const educationId = {
      id: deletedEducation
    };

    this.userSettings.deleteAdditionalEducation(i);

    this.userSettingsService.deleteAdditioanlEducationID(educationId).subscribe((res: any) => {});

  }

  public deleteDiplomaPhoto(imgName, institutIndex, imgIndex){
    
    this.userSettingsService.deleteFile({link: imgName})
    .subscribe((res: any) => {
      console.log(res);
      this.userSettings.additionalEducation[institutIndex].additionalDiploma.splice(imgIndex, 1);
    });

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

    console.log(this.files);
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
    this.addAdditionalEducation();
    this.submited = false;
  }

}
