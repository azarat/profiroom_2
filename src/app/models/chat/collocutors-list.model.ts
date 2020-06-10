import { Expose, Type } from 'class-transformer';
import { CollocutorLastMessageModel } from './collocutor-last-message.model';



export class CollocutorListModel {
  @Expose() id: number;
  @Expose() status: string;
  @Expose() roomId: string;
  // tslint:disable-next-line:variable-name
  @Expose() offers_title: string;
  @Expose() collocutorId: number;
  // tslint:disable-next-line:variable-name
  @Expose() freelancer_id: number;
  
  @Expose() collocutorAva: string;
  @Expose() lastMessageDate: string;
  @Expose() collocutorName: string;
  @Expose() collocutorSurname: string;
  @Expose() unread: string;
  // tslint:disable-next-line:variable-name
  @Expose() created_at: Date;
  @Expose() package: Date;
  @Expose() amount: Date;
  @Expose() breef: any;
  @Expose() moneyHolded: number;
  @Expose() canceled: number;
  // @Expose() earlyClosing: number;
  @Expose() earlyClosing: number;
  //  Last message model in chat collocutor list
  @Type(() => CollocutorLastMessageModel) message: CollocutorLastMessageModel[];
// {
//   @Expose() author: number;
//   @Expose() message: string;
//   @Expose() time: string;
// }

}
