import {
  Expose,
  Type
} from 'class-transformer';


export class UserSettingsModel {
  @Expose() avatar: string;
  @Expose() name: string;
  @Expose() surname: string;
  @Expose() gender: number;
  @Expose() description: number;

  @Expose() birthDay: {
    year: number;
    month: number;
    day: number;
  }

  @Expose() country: string;
  @Expose() city: string;

  @Type(() => Languages) languages: Languages[];
  @Type(() => Education) education: Education[];
}

export class Languages {
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


