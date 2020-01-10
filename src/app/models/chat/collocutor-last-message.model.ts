import { Expose, Type } from 'class-transformer';

export class CollocutorsLastMessageModel {
  @Expose() author: number;
  @Expose() message: string;
  @Expose() time: string;
}





