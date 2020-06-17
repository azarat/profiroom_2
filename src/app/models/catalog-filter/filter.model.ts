import {
  Expose,
  Type
} from 'class-transformer';


import { FilterPriceModel } from './price.model';
import { FilterIncludesModel } from './includes.model';
// import { type } from 'os';

export class FilterTypesModel {
  @Expose() PSD: boolean;
  @Expose() PNG: boolean;

}

export class CatalogFiltersModel  {
  @Expose() online?: boolean;
  @Expose() filterBy?: string;
  @Expose() current_page?: number;
  @Expose() page?: number;
  @Expose() subCategory?: string;
  @Expose() maxPrice?: number;
  @Expose() minPrice?: number;
  @Expose() maxTerm?: any;
  @Expose() PSD?: boolean;
  @Expose() PNG?: boolean;
  @Expose() commercial?: boolean;
  @Expose() confidentiality?: boolean;
  @Expose() agreement?: boolean;
  @Expose() LangUkr?: boolean;
  @Expose() LangRus?: boolean;
  @Expose() LangBr?: boolean;
  @Expose() extraTerms?: boolean;
  @Expose() extraChanges?: boolean;

  // @Expose() online: boolean;
  // @Expose() filterBy: string;
  // @Expose() current_page: any;
  // @Expose() subCategory: string;

  // @Expose() maxTerm: any;


  // @Expose() LangUkr: boolean;
  // @Expose() LangRus: boolean;
  // @Expose() LangBr: boolean;



  // @Expose() @Type(() => FilterTypesModel) filterTypesModel: FilterTypesModel;

  // @Expose() @Type(() => FilterPriceModel) filterPriceModel: FilterPriceModel;

  // @Expose() @Type(() => FilterIncludesModel) filterIncludesModel: FilterIncludesModel;

}


