export interface UserDataInterface {
  id: number | string;
  // role_id?: number | string;
  busy?: number;
  online?: boolean;
  avatar?: string;
  name?: string;
  surname?: string;
  rank_id?: number;
  country?: string;
  city?: string;
  email_verified_at?: string;
  endedWorks?: number;
  customer_deals_count?: number;
  freelancer_deals_count?: number;
  comments_freelancer_count?: number;
  answerTime?: number;
  description?: string;
  comments_count?: number;
  positive_comments_count?: number;
  negative_comments_count?: number;
  updated_at?: number;
  dealsCounts?: {
    inProgressOffers?: number;
    QueuedOffers?: number;
    EndedWorks?: number;
    dealsAsCustomer?: number;
  }
  arbitration?: {
    freelancer?: number;
    customer?: number;
    all?: number;
  }
  averageRating?: {
    freelancer?: {
      averageMark?: number;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
    }
    customer?: {
      averageMark?: number;
      requirementsClarity?: number;
      taskClarity?: number;
      contactLevel?: number;
    }
  }
  language?: [{
    langName?: string;
    langLevel?: number;
  }];
  education?: [{
    institution?: string;
    specialty?: string;
    startEducation?: number;
    finishEducation?: number;
    diploma_files?: [{
      link?: string;
    }]
  }];
  additionalEducation?: [{
    additionalInstitution?: string;
    courseName?: string;
    startStudyYear?: number;
    endStudyYear?: number;
    additional_diploma_files?: [{
      link?: string;
    }]
  }];
  offers?: [{
    id?: number;
    mainImage?: string;
    title?: string;
    description?: string;
    comments_count?: number;
    minPrice?: number;
    rating?: number;
  }];
  positiveComments?: [{
    created_at?: string;
    offers_id?: number;
    commentator_id?: number;
    commentText?: string;
    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        qualityMark?: number;
        termMark?: number;
        politenessMark?: number;
      }
    }];
    offers?: [{
      id: number;
      title?: string;
      mainImage?: string;
      description?: string;
      rating?: number;
    }];
    childs?: [{
      commentText?: string;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
      created_at?: string;
      author?: [{
        avatar?: string;
        name?: string;
        surname?: string;
        updated_at?: number;
        id?: number;
      }];
    }];
  }];
  negativeComments?: [{
    offers_id?: number;
    commentator_id?: number;
    commentText?: string;
    created_at?: string;
    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        qualityMark?: number;
        termMark?: number;
        politenessMark?: number;
      }
    }];
    offers?: [{
      id: number;
      title?: string;
      mainImage?: string;
      description?: string;
      rating?: number;
    }];
    childs?: [{
      commentText?: string;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
      created_at?: string;
      author?: [{
        avatar?: string;
        name?: string;
        surname?: string;
        updated_at?: number;
        id?: number;
      }];
    }];
  }];

  positiveCommentsCustomer?: [{
    created_at?: string;
    offers_id?: number;
    commentator_id?: number;
    commentText?: string;
    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        requirementsClarity?: number;
        taskClarity?: number;
        contactLevel?: number;
      }
    }];
    offers?: [{
      id: number;
      title?: string;
      mainImage?: string;
      description?: string;
      rating?: number;
    }];
    childs?: [{
      commentText?: string;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
      created_at?: string;
      author?: [{
        avatar?: string;
        name?: string;
        surname?: string;
        updated_at?: number;
        id?: number;
      }];
    }];
  }];
  negativeCommentsCustomer?: [{
    offers_id?: number;
    commentator_id?: number;
    commentText?: string;
    created_at?: string;
    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
      averageRating?: {
        averageMark?: number;
        requirementsClarity?: number;
        taskClarity?: number;
        contactLevel?: number;
      }
    }];
    offers?: [{
      id: number;
      title?: string;
      mainImage?: string;
      description?: string;
      rating?: number;
    }];
    childs?: [{
      commentText?: string;
      qualityMark?: number;
      termMark?: number;
      politenessMark?: number;
      created_at?: string;
      author?: [{
        avatar?: string;
        name?: string;
        surname?: string;
        updated_at?: number;
        id?: number;
      }];
    }];
  }];

}
