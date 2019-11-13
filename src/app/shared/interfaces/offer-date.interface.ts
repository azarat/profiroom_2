export interface OfferDataInterface {
    name?: string;
    user?: {
      avatar?: string;
      name?: string;
      surname?: string;
    };
    category: string;
    description?: string;
    raiting?: number;
    comments_count?: number;
    profi?: {
      name?: string;
    };
    filesDirectory?: string,
    files?: [{
      small?: string;
      medium?: string;
      big?: string;
    }
    ];
}
