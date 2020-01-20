import {
  Expose,
  Type
} from 'class-transformer';
import { Breef } from './breef.model';
import { ExtraFeatures } from './extra-features.model';
import { OfferFaq } from './offer-faq.model';
import { PackagesTitle } from './packages-title.model';
import { PackagesDescriptions } from './package-descriptions.model';
import { PackagesTerms } from './packages-terms.model';
import { PackagesChanges } from './packages-changes.model';
import { PackagesPrices } from './packages-price.model';
import { CompressedDeadlines } from './compressed-deadlines.model';
import { ExtraOfferChanges } from './extra-offer-changes.model';
import { CommercialOffer } from './commercial-offer.model';
import { MainOptions } from './main-service-options.model';

export class UserServiceModel {
  @Expose() offerId: string;
  @Expose() published: boolean;
  @Expose() id: any;
  @Expose() canPublish: boolean;
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
  @Type(() => ExtraFeatures) extra_features: ExtraFeatures[];
  // tslint:disable-next-line: variable-name
  @Type(() => OfferFaq) offer_faq: OfferFaq[];
  @Type(() => Breef) offerBreef: Breef[];


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

  public removeBreefItem(index: number) {
    this.offerBreef.splice(index, 1);
  }

}
