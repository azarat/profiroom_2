import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';

export class FilterIncludesModel {
  @Expose() commercial: boolean;
  @Expose() confidentiality: boolean;
  @Expose() agreement: boolean;


}

