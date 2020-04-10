export interface OffersListInterface {
  data?:
  {
    category_id: number;
    comments_count?: number;
    title?: string;
    description?: string;
    id?: number;
    minprice: number;
    name?: string;
    averageRaiting?: {
      averageMark?: number;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
    }
    sub_category_id: number;
    // user_id?: number;
    user?: [
      {
        avatar?: string;
        id?: number;
        name?: string;
        rank_id: number;
        surname?: string;
      }
    ];
    liked?: boolean;
  }[];
  current_page?: number;
  last_page?: number;
  first_page_url?: string;
  last_page_url?: string;
  next_page_url?: string;
  total?: number;
  name?: string;
}
