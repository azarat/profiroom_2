import { UserServiceModel } from '../user-service/user-service.model';

export class User {
  id: number;
  checked: number;
  email: string;
  // tslint:disable-next-line: variable-name
  email_verified_at: string;
  password: string;
  token: string;
  nikname: string;
  name: string;
  surname: string;
  avatar: string;
  purse: null;
  raiting: number;
  // tslint:disable-next-line: variable-name
  rank_id: number;
  // tslint:disable-next-line: variable-name
  role_id: number;
  // tslint:disable-next-line: variable-name
  updated_at: any;
  userServices: UserServiceModel[];

  // constructor(data) {
  //   data = data || {};
  //   this.id = data.id || null;
  //   this.name = data.name || null;
  //   this.surname = data.surname || null;

  // }
}
