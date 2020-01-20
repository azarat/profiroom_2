import { Expose } from 'class-transformer';

export class PackagesTitle {
  @Expose() basicTitle: string;
  @Expose() advancedTitle: string;
  @Expose() premiumTitle: string;
}
