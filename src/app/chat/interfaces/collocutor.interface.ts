
export interface CollocutorInterface {

  id?: number;
  roomId?: number | string;
  status?: string;
  avatar?: string;
  unread?: number;
  collocutorId?: number;
  freelancer_id?: number;
  customer_id?: number;
  projectStage: number;
  collocutorAva?: string;
  collocutorName?: string;
  collocutorSurname?: string;
  created_at?: Date;
  package?: string;
  offers_title?: string;
  brief?: any;
  offers_id?: number;
  offer_id?: number;
  canceled?: number;
  amount?: number;
  moneyHolden?: number;
  workStarted?: number;
  changes?: number;
  term?: number;
  early_closing?: number;
  workEnded: number;
  dealDone: number;
  collocutorOnline: boolean;
  dealCanceled: number;
  message: {
    author?: number | string;
    message?: string;
    dateTime?: Date;
    authorAva?: string;
    type?: string;
  }[];
  extra_features: any [];
  history?: any[];
  negative_comments_count?: any;
  positive_comments_count?: any;
  rating?: any;
  raiting?: number;
  language?: string;
  time?: string;
  description?: string;
  country?: string;
  arbitration?: any;
  endedWorks?: number;
  answerTime?: number;
  // tslint:disable-next-line: variable-name
  comments_count?: number;
  commented_freelancer?: number;
  commented_customer?: number;
}
