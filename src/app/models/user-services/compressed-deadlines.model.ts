import { Expose } from 'class-transformer';

export class CompressedDeadlines {
  @Expose() publishCompressedDeadlines: boolean;
  @Expose() basicCompressedDays: string; // required    --- if  [useCompressedDeadlines]
  @Expose() basicCompressedPrice: string; // required   --- if  [useCompressedDeadlines]
  @Expose() advancedCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() advancedCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() premiumCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() premiumCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
}
