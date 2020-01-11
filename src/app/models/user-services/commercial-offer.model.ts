import { Expose } from 'class-transformer';

export class CommercialOffer {
  @Expose() publishCommercialOffer: boolean;
  @Expose()  priceForCommercialOffer: string; // required   --- if  [useCommercialOffer]
}
