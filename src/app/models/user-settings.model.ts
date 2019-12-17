import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';


export class UserSettingsModel {
  @Expose() avatar: string;
  @Expose() name: string;
  @Expose() surname: string;
  @Expose() gender: string;
  @Expose() description: string;
  @Expose() id: string;

  @Expose() additionalDiplomaFiles: any;

  @Expose() birthDay: {
    year: number;
    month: number;
    day: number;
  };

  @Expose() country: string;
  @Expose() city: string;

  // tslint:disable-next-line: no-use-before-declare
  @Type(() => Language) language: Language[];
  // tslint:disable-next-line: no-use-before-declare
  @Type(() => Education) education: Education[];
  // tslint:disable-next-line: no-use-before-declare
  @Type(() => AdditionalEducation) additionalEducation: AdditionalEducation[];

  // -------delete option------
  public removeLanguage(index: number) {
    this.language.splice(index, 1);
  }

  public deleteEducation(index: number) {
    this.education.splice(index, 1);
  }

  public deleteAdditionalEducation(index: number) {
    this.additionalEducation.splice(index, 1);
  }
}

export class Language {
  @Expose() langName: string;
  @Expose() langLevel: number;
}

export class Education {
  @Expose() institution: string;
  @Expose() academicDegree: number;
  @Expose() specialty: string;
  @Expose() startEducation: number;
  @Expose() finishEducation: number;
  @Expose() diplomaFiles: any;
}

export class AdditionalEducation {
  @Expose() additionalInstitution: string;
  @Expose() courseName: string;
  @Expose() startStudyMounth: number;
  @Expose() startStudyYear: number;
  @Expose() endStudyMounth: number;
  @Expose() endStudyYear: number;
  @Expose() additionalDiplomaFiles: any;
}

