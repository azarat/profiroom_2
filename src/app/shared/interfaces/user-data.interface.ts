export interface UserDataInterface {
  id: number|string;
  load?: number;
  online?: number;
  avatar?: string;
  name?: string;
  surname?: string;
  lvl?: number;
  country?: string;
  city?: string;
  endedWorks?: number;
  arbitration?: number;
  answerTime?: number;
  description?: string;
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
  // ?:;
  // ?:;
  // ?:;
  // title?: string;
  // mainImage?: string;
  // rating?: string;
  // user?: {
  //   avatar?: string;

  //   rank_id?: string;
  //   userOffers?: [{
  //     title?: string;
  //     raiting?: number;
  //     comments_count?: number;
  //     mainImage?: string;
  //     minprice?: number;
  //   }];
  // };
  // category: string;
  // comments?: [{
  //   mark?: number;
  //   commentText?: string;
  //   user?: {
  //     name?: string;
  //     surname?: string;
  //     avatar?: string;
  //   }
  // }];
  // description?: string;
  // raiting?: number;
  // comments_count?: number;
  // profi?: {
  //   name?: string;
  // };

}
