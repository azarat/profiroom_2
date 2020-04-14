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

  @Expose() cardName: string;
  @Expose() cardSurname: string;
  @Expose() cardPhone: string;
  @Expose() cardNumber1: number;
  @Expose() cardNumber2: number;
  @Expose() cardNumber3: number;
  @Expose() cardNumber4: number;
  @Expose() expirationDate: number;
  @Expose() cvv: number;

  @Expose() oldPassword: string;
  @Expose() newPassword: string;
  @Expose() copyNewPassword: string;
  @Expose() oldMail: string;
  @Expose() newMail: string;
  @Expose() copyNewMail: string;
  @Expose() email: string;

  @Expose() allDiplomaPhotos: [];


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
  // tslint:disable-next-line: no-use-before-declare
  @Type(() => UserNotifications) userNotifications: UserNotifications;

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
  @Expose() id: number;
  @Expose() institution: string;
  @Expose() academicDegree: number;
  @Expose() specialty: string;
  @Expose() startEducation: number;
  @Expose() finishEducation: number;
  @Expose() diploma: any[];
}

export class AdditionalEducation {
  @Expose() id: number;
  @Expose() additionalInstitution: string;
  @Expose() courseName: string;
  @Expose() startStudyMonth: number;
  @Expose() startStudyYear: number;
  @Expose() endStudyMonth: number;
  @Expose() endStudyYear: number;
  @Expose() additionalDiploma: any[];
}

export class UserNotifications {
  @Expose() notificationsAll: boolean;
  @Expose() privateMessages: boolean;
  @Expose() newOrders: boolean;
  @Expose() serviceNotifications: boolean;
  @Expose() messagesActiveProject: boolean;
  @Expose() reservationFinancial: boolean;
  @Expose() deadlines: boolean;
  @Expose() orderFeedback: boolean;
}


