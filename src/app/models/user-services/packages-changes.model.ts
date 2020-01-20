import { Expose } from 'class-transformer';

export class PackagesChanges {
  @Expose() basicChanges: string;
  @Expose() advancedChanges: string;
  @Expose() premiumChanges: string;
}
