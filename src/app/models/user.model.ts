import { Expose, Type } from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { UserServiceModel } from './user-services/user-service.model';

export class UserModel {
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
  @Expose() purse: any;
  @Expose() rating: number;
  // tslint:disable-next-line: variable-name
  @Expose() rank_id: number;
  // tslint:disable-next-line: variable-name
  @Expose() role_id: number;
  // tslint:disable-next-line: variable-name
  @Expose() updated_at: any;
  @Expose() busy: any;
  @Expose() allDealsPerYears: number[];
  @Expose() allDealsperMonths: number[];
  @Expose() achivments: any;
  @Expose() pieChart: number[];

  @Type(() => UserServiceModel) userservice: UserServiceModel[];


  constructor(
    private http: HttpClient
  ) {}

  public deleteService(id) {
    return this.http.delete('/deleteOffer?' + 'offerId=' + id);
  }
}
