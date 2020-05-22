import { Expose } from 'class-transformer';

export class BriefAnswerVariants {
  @Expose() answer: string;
  @Expose() answers: string;
}
