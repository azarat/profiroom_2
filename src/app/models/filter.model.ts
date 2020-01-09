import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';

export class CatalogFilterModel {
  @Expose() filterBy?: string;
  @Expose() subCategory?: string;
  @Expose() minPrice?: number;
  @Expose() maxPrice?: number;
  @Expose() maxTerm?: any;
  @Expose() PSD?: boolean;
  @Expose() PNG?: boolean;
  @Expose() commercial?: boolean;
  @Expose() confidentiality?: boolean;
  @Expose() agreement?: boolean;
}
