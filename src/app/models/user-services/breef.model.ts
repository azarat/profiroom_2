import { Expose, Type } from 'class-transformer';
import { BreefAnswerVariants } from './breef-answer-wariants.model';



export class Breef {
  @Expose() breefTitle: string;
  @Expose() breefAnswerType: string;
  @Expose() breefAnwerRequired: boolean;
  @Type(() => BreefAnswerVariants) breefAnswerVariants: BreefAnswerVariants[];
  @Expose() breefMultiAnswers: boolean;
}
