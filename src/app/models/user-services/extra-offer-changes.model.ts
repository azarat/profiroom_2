import { Expose } from 'class-transformer';

export class ExtraOfferChanges {
  @Expose() publishExtraOfferChanges: boolean;
  @Expose()  extraChangesDays: string; // required   --- if  [useExtraOfferChanges]
  @Expose()  extraChangesPrice: string; // required   --- if  [useExtraOfferChanges]
}
