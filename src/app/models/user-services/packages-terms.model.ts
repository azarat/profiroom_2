import { Expose } from 'class-transformer';

export class PackagesTerms {
  @Expose()  basicTerm: string;
  @Expose()  advancedTerm: string;
  @Expose() premiumTerm: string;
}
