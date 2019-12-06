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
}
