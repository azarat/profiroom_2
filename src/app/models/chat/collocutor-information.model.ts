import { Expose } from 'class-transformer';


export class CollocutorInformationModel {

  @Expose() id: string;
  @Expose() avatar: string;
  @Expose() rating: number;
  @Expose() message: string;
  @Expose() language: string;
  @Expose() time: string;
  @Expose() description: string;
  @Expose() country: string;
  @Expose() arbitration: number;
  @Expose() endedWorks: number;
  @Expose() answerTime: number;
  // tslint:disable-next-line: variable-name
  @Expose() comments_count: number;
}
