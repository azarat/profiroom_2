import { Expose } from 'class-transformer';

export class UserServiceModel {
  @Expose() offerId: number;
  @Expose() name: string;
  @Expose() category: string;
  @Expose() subCategories: any;
  @Expose() subСategory: string;
  @Expose() tags: string;
  @Expose() step: number;
  @Expose() files: [];

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

