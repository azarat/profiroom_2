import { Expose } from 'class-transformer';

export class PackagesDescriptions {
  @Expose() basicDescription: string;
  @Expose() advancedDescription: string;
  @Expose() premiumDescription: string;
}
