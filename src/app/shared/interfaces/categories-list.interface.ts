export interface CategoryListInterface {
  category?: [{
    description?: string;
    groups?: [];
    id?: number;
    link?: string;
    name?: string;
    sub_categories?: [{
      category_id?: number;
      description?: string;
      group?: string;
      id?: number;
      link?: string;
      name?: string;
    }];
  }];
}
