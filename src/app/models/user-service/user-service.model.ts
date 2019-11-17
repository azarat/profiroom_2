import {
  Expose,
  Type
} from 'class-transformer';


export class PackagesTitle {
  @Expose() basicTitle: string;
  @Expose() advancedTitle: string;
  @Expose() premiumTitle: string;
}

export class PackagesDescriptions {
  @Expose() basicDescription: string;
  @Expose() advancedDescription: string;
  @Expose() premiumDescription: string;
}

export class PackagesTerms {
  basicTerm: string;
  advancedTerm: string;
  premiumTerm: string;
}

export class PackagesChanges {
  basicChange: string;
  advancedChange: string;
  premiumChange: string;
}

export class PackagesPrices {
  basicPrice: string;
  advancedPrice: string;
  premiumPrice: string;
}
export class CompressedDeadlines {
  publishCompressedDeadlines: boolean;
  basicCompressedDays: string; // required    --- if  [useCompressedDeadlines]
  basicCompressedPrice: string; // required   --- if  [useCompressedDeadlines]
  advancedCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  advancedCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
  premiumCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  premiumCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
}
export class ExtraOfferChanges {
  publishExtraOfferChanges: boolean;
  extraChangesDays: string; // required   --- if  [useExtraOfferChanges]
  extraChangesPrice: string; // required   --- if  [useExtraOfferChanges]
}
export class CommercialOffer {
  publishCommercialOffer: boolean;
  priceForCommercialOffer: string; // required   --- if  [useCommercialOffer]
}
export class MainOptions {
  title: string;
  basic: boolean;
  advanced: boolean;
  premium: boolean;
}
export class ExtraOptions {
  optionPublish: boolean;
  optionTitle: string;
  optionDescription: string;
  optionPrice: string;
  optionPerTime: string;
}

export class UserServiceModel {
  @Expose() offerId: number;
  @Expose() id: any;
  @Expose() title: string;
  @Expose() category: string;
  @Expose() subCategories: any;
  @Expose() subCategory: string;
  @Expose() tags: {
    tag: string
  } [];
  @Expose() offerMainImage: string;
  @Expose() nextStep: number;
  @Expose() step: number;
  @Expose() files: any;
  @Expose() description: any;
  @Expose() allPackages: boolean;
  @Type(() => PackagesTitle) packagesTitle: PackagesTitle;
  @Type(() => PackagesDescriptions) packagesDescriptions: PackagesDescriptions;
  @Type(() => PackagesTerms) packagesTerms: PackagesTerms;
  @Type(() => PackagesChanges) packagesChanges: PackagesChanges;
  @Type(() => PackagesPrices) packagesPrices: PackagesPrices;
  @Type(() => CompressedDeadlines) compressedDeadlines: CompressedDeadlines;
  @Type(() => ExtraOfferChanges) extraOfferChanges: ExtraOfferChanges;
  @Type(() => CommercialOffer) commercialOffer: CommercialOffer;
  // tslint:disable-next-line: variable-name
  @Type(() => MainOptions) main_options: MainOptions[];
  // tslint:disable-next-line: variable-name
  @Type(() => ExtraOptions) extra_features: ExtraOptions[];



  // -------delete option------
  public removeMainOption(index) {
    this.main_options.splice(index, 1);
  }
  public removeExtraOption(index) {
    this.extra_features.splice(index, 1);
  }

}
