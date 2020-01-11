import { Expose, Type } from 'class-transformer';
import { CollocutorsLastMessageModel } from './collocutor-last-message.model';



export class CollocutorListModel {
  @Expose() id: number;
  @Expose() status: string;
  @Expose() roomId: string;
  @Expose() collocutorId: number;
  @Expose() collocutorAva: string;
  @Expose() lastMesageDate: string;
  @Expose() collocutorName: string;
  @Expose() collocutorSurname: string;
  //  Last message model in chat collocutor list
  @Type(() => CollocutorsLastMessageModel) lastMessage: CollocutorsLastMessageModel[];

}
