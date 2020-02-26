export interface UserDataInterface {
  id: number | string;
  role_id?: number | string;
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
  arbitration?: number;
  answerTime?: number;
  description?: string;
  comments_count?: number;
  positive_comments_count?: number;
  negative_comments_count?: number;
  updated_at?: number;
  language?: [{
    langName?: string;
    langLevel?: number;
  }];
  education?: [{
    institution?: string;
    specialty?: string;
    startEducation?: number;
    finishEducation?: number;
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
    qualityMark?: number;
    termMark?: number;
    politenessMark?: number;

    offers_id?: number;
    commentator_id?: number;
    commentText?: string;

    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
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
    qualityMark?: number;
    termMark?: number;
    politenessMark?: number;
    offers_id?: number;
    commentator_id?: number;
    commentText?: string;
    author?: [{
      id: number;
      name?: string;
      surname?: string;
      avatar?: string;
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
