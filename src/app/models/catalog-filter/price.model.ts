import {
  Expose,
  Type
} from 'class-transformer';
// import { type } from 'os';

export class FilterPriceModel {
  @Expose() minPrice: number;
  @Expose() maxPrice: number;
}

