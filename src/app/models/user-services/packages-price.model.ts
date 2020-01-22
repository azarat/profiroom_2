import { Expose } from 'class-transformer';

export class PackagesPrices {
  @Expose() basicPrice: string;
  @Expose() advancedPrice: string;
  @Expose() premiumPrice: string;
}
