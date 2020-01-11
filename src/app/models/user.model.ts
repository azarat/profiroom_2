import { UserServiceModel } from './user-service.model';
import { Expose, Type } from 'class-transformer';

export class User {
  @Expose() id: number;
  @Expose() checked: number;
  @Expose() email: string;
  // tslint:disable-next-line: variable-name
  @Expose() email_verified_at: string;
  @Expose() password: string;
  @Expose() token: string;
  @Expose() nikname: string;
  @Expose() name: string;
  @Expose() surname: string;
  @Expose() avatar: string;
  @Expose() purse: null;
  @Expose() raiting: number;
  // tslint:disable-next-line: variable-name
  @Expose() rank_id: number;
  // tslint:disable-next-line: variable-name
  @Expose() role_id: number;
  // tslint:disable-next-line: variable-name
  @Expose() updated_at: any;

  @Type(() => UserServiceModel) userservice: UserServiceModel[];


}
