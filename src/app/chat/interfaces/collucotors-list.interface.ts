
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
  offers_title?: string;
  breef?: number;
  message: {
    author?: number | string;
    message?: string;
    dateTime?: Date;
    authorAva?: string;
    type?: string;
  }[];
}
