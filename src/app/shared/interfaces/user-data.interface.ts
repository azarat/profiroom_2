export interface UserDataInterface {
  id: number | string;
  // role_id?: number | string;
  load?: number;
  online?: number;
  avatar?: string;
  name?: string;
  surname?: string;
  rank_id?: number;
  country?: string;
  city?: string;
  email_verified_at?: string;
  inProgressOffers?: number;
  queuedOffers?: number;
  endedWorks?: number;

  customer_deals_count?: number;
  freelancer_deals_count?: number;
  comments_freelancer_count?: number;
  commentsсustomer_count?: number;
  arbitration?: {
    freelancer?: number;
    customer?: number;
    all?: number;
  }
  answerTime?: number;
  description?: string;
  comments_count?: number;
  positive_comments_count?: number;
  negative_comments_count?: number;
  updated_at?: number;
  averageRaiting?: {
    averageMark?: number;
    qualityMark?: number;
    termMark?: number;
    politenessMark?: number;
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
  }];
  offers?: [{
    id?: number;
    mainImage?: string;
    title?: string;
    description?: string;
    comments_count?: number;
    minPrice?: number;
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
      averageRaiting?: {
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
      raiting?: number;
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
      averageRaiting?: {
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
      raiting?: number;
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
