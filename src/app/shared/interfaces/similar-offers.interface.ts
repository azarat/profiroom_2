export interface SimilarOffersInterface {
    id?: number;
    description?: string;
    title?: string;

    category_id: number;
    comments_count?: number;
    mainImage?: string;
    
    minprice: number;
    name?: string;
    rating?: number;
    sub_category_id: number;

    user?: [
        {
        avatar?: string;
        id?: number;
        name?: string;
        surname?: string;
        rank_id: number;
        
        }
    ];
    liked?: boolean;
}

  