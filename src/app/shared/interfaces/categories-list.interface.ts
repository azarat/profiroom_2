export interface CategoryListInterface {
  category?: [{
    descroption?: string;
    groups?: [];
    id?: number;
    link?: string;
    name?: string;
    sub_categories?: [{
      category_id?: number;
      descroption?: string;
      group?: string;
      id?: number;
      link?: string;
      name?: string;
    }];
  }];
}
