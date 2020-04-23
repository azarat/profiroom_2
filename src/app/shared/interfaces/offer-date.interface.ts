export interface OfferDataInterface {
  id?: number;
  title?: string;
  mainImage?: string;

  user_id?: number;
  created_at?: string;
  allPackages?: number;
  description?: string;
  rating?: number;
  comments_count?: number;
  averageRating?: {
    averageMark?: number;
    qualityMark?: number;
    termMark?: number;
    politenessMark?: number;
  }
  user?: {
    id?: number;
    country?: string;
    answerTime?: number;
    inProgressOffers?: number;
    description?: string;
    avatar?: string;
    name?: string;
    surname?: string;
    rank_id?: string;
    online: boolean;
    countOffers?: number;
    userOfferCount?: any;
    averageRating?: {
      averageMark?: number;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
    }
    userOffers?: [{
      title?: string;
      rating?: number;
      comments_count?: number;
      mainImage?: string;
      minprice?: number;
      id?: number;
      liked?: number;
      minPrice?: number;
    }];
    arbitration?: {
      freelancer?: number;
      customer?: number;
      all?: number;
    }
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
  filesDirectory?: string;
  files?: [{
    small?: string;
    medium?: string;
    big?: string;
  }];
  positiveComments?: [{
    mark?: number;
    commentText?: string;
    requirementsClarity?: number;
    taskClarity?: number;
    contactLevel?: number;
    author?: {
      id?: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        qualityMark?: number;
        termMark?: number;
        politenessMark?: number;
      }
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

    requirementsClarity?: number;
    taskClarity?: number;
    contactLevel?: number;
    author?: {
      id?: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        qualityMark?: number;
        termMark?: number;
        politenessMark?: number;
      }
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
  visitedOffers?: [{
    title?: string;
    rating?: number;
    comments_count?: number;
    mainImage?: string;
    minprice?: number;
  }];
  extra_terms?: [{
    id?: number;
    offers_id?: number;
    package?: string;
    conditions?: number;
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
