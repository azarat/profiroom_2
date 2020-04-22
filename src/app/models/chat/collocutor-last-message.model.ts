import { Expose, Type } from 'class-transformer';

export class CollocutorLastMessageModel {
  @Expose() author: number;
  @Expose() message: string | object;
  @Expose() time: string;
}





