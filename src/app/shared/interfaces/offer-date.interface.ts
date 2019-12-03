export interface OfferDataInterface {
  id?: number;
  title?: string;
  mainImage?: string;
  rating?: string;
  user?: {
    avatar?: string;
    name?: string;
    surname?: string;
    rank_id?: string;
    userOffers?: [{
      title?: string;
      raiting?: number;
      comments_count?: number;
      mainImage?: string;
      minprice?: number;
    }];
  };
  category: string;
  comments?: [{
    mark?: number;
    commentText?: string;
    user?: {
      name?: string;
      surname?: string;
      avatar?: string;
    }
  }];
  description?: string;
  raiting?: number;
  comments_count?: number;
  profi?: {
    name?: string;
  };
  filesDirectory?: string;
  files?: [{
    small?: string;
    medium?: string;
    big?: string;
  }];
  positiveComments?: [{
    mark?: number;
    commentText?: string;
    user?: {
      name?: string;
      surname?: string;
      avatar?: string;
    }
    child?: [{
      commentText?: string;
      user?: {
        name?: string;
        surname?: string;
        avatar?: string;
      }
    }];
  }];
  positive_comments_count?: number;
  negativeComments?: [{
    mark?: number;
    commentText?: string;
    user?: {
      name?: string;
      surname?: string;
      avatar?: string;
    }
    child?: [{
      commentText?: string;
      user?: {
        name?: string;
        surname?: string;
        avatar?: string;
      }
    }];
  }];
  negative_comments_count?: number;
  basic?: [{
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  }];
  advanced?: [{
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  }];
  premium?: [{
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  }];
  main_options?: [{
    offers_id?: number;
    basic?: number;
    advanced?: number;
    premium?: number;
    title?: string;
  }];
  offer_faq?: [{
    question?: string;
    answer?: string;
  }];
  // userOffer?: [{
  //   title?: string;
  //   raiting?: number;
  //   comments_count?: number;
  //   mainImage?: string;
  //   minprice?: number;
  // }];
  visitedOffers?: [{
    title?: string;
    raiting?: number;
    comments_count?: number;
    mainImage?: string;
    minprice?: number;
  }];
}
