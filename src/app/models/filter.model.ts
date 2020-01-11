import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';

export class CatalogFiltersModel {
  @Expose() filterBy?: string;
  @Expose() current_page?: any;
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
