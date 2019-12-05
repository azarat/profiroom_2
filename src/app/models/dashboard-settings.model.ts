import {
  Expose,
  Type
} from 'class-transformer';


export class DashboardSettingsModel {
  @Expose() avatar: string;
  @Expose() name: string;
  @Expose() surname: string;
  @Expose() gender: number;
  @Expose() description: number;
}
