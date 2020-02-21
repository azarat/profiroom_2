
export interface CollucutorsListInterface {

  id?: number;
  roomId?: number;
  status?: number | string;
  unread?: number | string;
  collocutorId?: number;
  projectStage: number;
  collocutorAva?: string;
  collocutorName?: string;
  collocutorSurname?: string;
  package?: string;
  offers_title?: string;
  breef?: number;
  offers_id?: number;
  offer_id?: number;
  amount?: number;
  message: {
    author?: number | string;
    message?: string;
    dateTime?: Date;
    authorAva?: string;
    type?: string;
  }[];
}
