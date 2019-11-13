import { Expose } from 'class-transformer';

export class UserServiceModel {
  @Expose() offerId: number;
  @Expose() id: any;
  @Expose() name: string;
  @Expose() category: string;
  @Expose() subCategories: any;
  @Expose() subCategory: string;
  @Expose() tags: [{ name: string }];
  @Expose() step: number;
  @Expose() files: any;
  @Expose() description: any;
  @Expose() allPackages: boolean;
  @Expose() packagesTitle:
    {
      basicTitle: string, // string
      classicTitle: string, // string
      premiumTitle: string, // string
    };
  @Expose() packagesDescriptions:
    {
      basicDescription: string, // string
      classicDescription: string, // string
      premiumDescription: string, // string
    };
  @Expose() packagesDeadlines:
    {
      basicDeadline: string, // number
      classicDeadline: string, // number
      premiumDeadline: string, // number
    };
  @Expose() packagesChanges:
    {
      basicChange: string, // number
      classicChange: string, // number
      premiumChange: string, // number
    };
  @Expose() packagesPrices:
    {
      basicPrice: string, // number
      classicPrice: string, // number
      premiumPrice: string, // number
    };

  // constructor(data) {
  //   data = data || {};
  //   this.id = data.id || null;
  //   this.name = data.name || null;
  //   this.category = data.category || null;
  //   this.subcategory = data.subcategory || null;
  //   this.tags = data.tags || null;
  //   this.category = data.category || null;
  //   this.category = data.category || null;
  // }
}

