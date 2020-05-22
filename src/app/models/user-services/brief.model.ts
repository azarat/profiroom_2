import { Expose, Type } from 'class-transformer';
import { BriefAnswerVariants } from './brief-answer-wariants.model';



export class Brief {
  @Expose() title: string;
  @Expose() answer_type: string;
  @Expose() answer_required: any;
  @Type(() => BriefAnswerVariants) briefAnswerVariants: BriefAnswerVariants[];
  @Expose() briefMultiAnswers: any;
  @Expose() briefAnswer: any;
  @Expose() multi_answers: any;
  @Expose() answers: any;

}
