
export interface CollucutorsListInterface {

  id?: number;
  roomId?: number;
  status?: string;
  unread?: number | string;
  collocutorId?: number;
  freelanser_id?: number;
  customer_id?: number;
  projectStage: number;
  collocutorAva?: string;
  collocutorName?: string;
  collocutorSurname?: string;
  created_at?: Date;
  package?: string;
  offers_title?: string;
  breef?: any;
  offers_id?: number;
  offer_id?: number;
  amount?: number;
  moneyHolded?: number;
  workStarted?: number;
  changes?: number;
  term?: number;
  earlyСlosing: number;
  workEnded: number;
  dealDone: number;
  message: {
    author?: number | string;
    message?: string;
    dateTime?: Date;
    authorAva?: string;
    type?: string;
  }[];
  extra_features: any [];
  history?: any[];
}
