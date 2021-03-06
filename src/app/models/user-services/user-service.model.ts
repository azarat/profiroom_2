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
  @Expose()  basicTerm: string;
  @Expose()  advancedTerm: string;
  @Expose() premiumTerm: string;
}

export class PackagesChanges {
  @Expose() basicChanges: string;
  @Expose() advancedChanges: string;
  @Expose() premiumChanges: string;
}

export class PackagesPrices {
  @Expose() basicPrice: string;
  @Expose() advancedPrice: string;
  @Expose() premiumPrice: string;
}
export class CompressedDeadlines {
  @Expose() publishCompressedDeadlines: number | boolean;
  @Expose() basicCompressedDays: string; // required    --- if  [useCompressedDeadlines]
  @Expose() basicCompressedPrice: string; // required   --- if  [useCompressedDeadlines]
  @Expose() advancedCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() advancedCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() premiumCompressedDays: string; // required ---- if  [useCompressedDeadlines && allPackages]
  @Expose() premiumCompressedPrice: string; // required ---- if  [useCompressedDeadlines && allPackages]
}
export class ExtraOfferChanges {
  @Expose() publishExtraOfferChanges: number | boolean;
  @Expose()  extraChangesDays: string; // required   --- if  [useExtraOfferChanges]
  @Expose()  extraChangesPrice: string; // required   --- if  [useExtraOfferChanges]
}
export class CommercialOffer {
  @Expose() publishCommercialOffer: number | boolean;
  @Expose()  priceForCommercialOffer: string; // required   --- if  [useCommercialOffer]
}
export class MainOptions {
  @Expose() title: string;
  @Expose() basic: boolean;
  @Expose() advanced: boolean;
  @Expose() premium: boolean;
}
export class ExtraFeatures {
  @Expose() optionPublish: number | boolean;
  @Expose() optionTitle: string;
  @Expose() optionDescription: string;
  @Expose() optionPrice: string;
  @Expose() optionCountDays: string;
}

export class OfferFaq {
  @Expose() question: string;
  @Expose() answer: string;
}

export class BriefAnswerVariants {
  @Expose() answerVariant: string;
}
export class Brief {
  @Expose() briefTitle: string;
  @Expose() briefAnswerType: string;
  @Expose() briefAnwerRequired: number | boolean;
  @Type(() => BriefAnswerVariants) briefAnswerVariants: BriefAnswerVariants[];
  @Expose() briefMultianswers: boolean;
  @Expose() briefMultiAnswers: boolean;
  @Expose() briefAnswer: any;
}



export class UserServiceModel {
  @Expose() offerId: string;
  @Expose() published: number | boolean;
  @Expose() id: any;
  @Expose() canPublish: number | boolean;
  @Expose() title: string;
  @Expose() category: string;
  @Expose() subCategories: any;
  @Expose() subCategory: string;
  @Expose() tags: {
    tag: string
  } [];
  @Expose() mainImage: string;
  @Expose() offerMainImage: string;

  @Expose() nextStep: number;
  @Expose() step: number;
  @Expose() files: any;
  @Expose() description: any;
  @Expose() allPackages: number | boolean;
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
  @Type(() => ExtraFeatures) extra_features: ExtraFeatures[];
  // tslint:disable-next-line: variable-name
  @Type(() => OfferFaq) offer_faq: OfferFaq[];
  @Type(() => Brief) offerbrief: Brief[];


  // -------delete option------
  public removeMainOption(index: number) {
    this.main_options.splice(index, 1);
  }
  public removeExtraOption(index: number) {
    this.extra_features.splice(index, 1);
  }

  public removeFaqItem(index: number) {
    this.offer_faq.splice(index, 1);
  }

  public removeBriefItem(index: number) {
    this.offerbrief.splice(index, 1);
  }

}
