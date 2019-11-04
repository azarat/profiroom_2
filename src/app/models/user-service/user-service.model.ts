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

