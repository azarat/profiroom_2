import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsModel } from 'src/app/models/user-settings.model';
import { UserSettingsService } from '../../../../services/user-settings.service';

@Component({
  selector: 'app-education-user-settings',
  templateUrl: './education-user-settings.component.html',
  styleUrls: ['./education-user-settings.component.scss']
})
export class EducationUserSettingsComponent implements OnInit {
  @Input() userSettings: UserSettingsModel;
  public openItem: number = 1;
  files: any = [];
  previewUrl: any;

  public yearsArr = [];
  public yearsFiltered = [];
  // public academicDegrees = [
  //   'Молодший спеціаліст',
  //   'Бакалавр',
  //   'Спеціаліст',
  //   'Магістр'
  // ];
  // public previewUrl = [
  //   {link: "offerFiles/medium/testfile4.png"},
  //   {link: "offerFiles/medium/testfile2.png"},
  //   {link: "offerFiles/medium/testfile3.jpeg"},
  // ]

  public academicDegrees = [1, 2, 3, 4, 5];

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit() {
    this.createYears();
  }

  addEducation(i) {
    this.userSettings.education.push({
      institution: null,
      academicDegree: null,
      specialty: null,
      startEducation: null,
      finishEducation: null,
      diplomaFiles: null
    });
    this.openItem = i;
  }

  deleteEducation(index: number) {
    this.userSettings.deleteEducation(index);
  }

  //  --------------- file uploading ---------------
  fileProgress = (event: any) => {
    const formData: FormData = new FormData();
    // formData.append('offerId', this.userSettings.id);
    this.files = [];
    for (let index = 0; index < event.length; index++) {
      this.files.push(event[index]);
      console.log(this.files);
    }
    // ------- put files in FormData -------//
    this.files.forEach((el: any) => {
      formData.append(el, el.name);
      console.log(formData);
    });
    // ------- load Files -----

    this.userSettingsService
      .uploadDiplomaPhotos(formData)
      .subscribe((res: []) => {
        this.previewUrl = res;
        console.log(this.previewUrl);
      });
  }

  // --------------- delete files -----------------//
  deleteAttachment = (index: number) => {
    this.userSettingsService.deleteFile({ id: index }).subscribe((res: any) => {
      if (res.status === 'ok') {
        this.previewUrl = this.previewUrl.filter((obj: any) => {
          return obj.id !== index;
        });
      }
    });
  }

  chooseItem(i) {
    if (this.openItem === i) {
      this.openItem = null;
    } else {
      this.openItem = i;
    }
  }

  createYears() {
    for (let i = 1960; i <= 2019; i++) {
      this.yearsArr.push(i);
    }
  }

  // setMinYear(x) {
  //   console.log(x);
  //   for (let i = 1960; i <= x; i++) {
  //     this.yearsFiltered.push(i);
  //   }
  // }
}
