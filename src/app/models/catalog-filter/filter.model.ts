import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';

export class CatalogFiltersModel {
  @Expose() online?: boolean;
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
  @Expose() LangUkr?: boolean;
  @Expose() LangRus?: boolean;
  @Expose() LangBr?: boolean;

}
