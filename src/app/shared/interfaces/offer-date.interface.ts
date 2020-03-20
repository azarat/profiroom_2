export interface OfferDataInterface {
  id?: number;
  title?: string;
  mainImage?: string;
  rating?: string;
  user_id?: number;
  created_at?: string;
  allPackages?: number;
  averageMark?: number;
  user?: {
    id?: number;
    country?: string;
    answerTime?: number;
    arbitration?: number;
    inProgressOffers?: number;
    description?: string;
    avatar?: string;
    name?: string;
    surname?: string;
    rank_id?: string;
    qualityMark?: number;
    termMark?: number;
    politenessMark?: number;
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
    author?: {
      id?: number;
      name?: string;
      surname?: string;
      avatar?: string;
    }
    child?: [{
      commentText?: string;
      author?: {
        id?: number;
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
    author?: {
      id?: number;
      name?: string;
      surname?: string;
      avatar?: string;
    }
    child?: [{
      commentText?: string;
      author?: {
        id?: number;
        name?: string;
        surname?: string;
        avatar?: string;
      }
    }];
  }];
  negative_comments_count?: number;
  basic?: {
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  };
  advanced?: {
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  };
  premium?: {
    title?: string;
    term?: number;
    price?: number;
    description?: string;
    changes?: number;
  };
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
  extra_terms?: [{
    id?: number;
    offers_id?: number;
    package?: string;
    coonditions?: number;
    count_days?: number;
    price?: number;
    published?: number;
  }];
  extra_commercial?: {
    id?: number;
    offers_id?: number;
    price?: number;
    published?: number;
  };
  extra_changes?: {
    id?: number;
    offers_id?: number;
    count?: number;
    price?: number;
    published?: number;
  };
  extra_features?: [{
    id?: number;
    offers_id?: number;
    title?: string;
    description?: string;
    count_days?: number;
    price?: number;
    published?: number;
  }];
}
