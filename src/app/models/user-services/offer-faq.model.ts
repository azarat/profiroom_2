import { Expose } from 'class-transformer';

export class OfferFaq {
  @Expose() question: string;
  @Expose() answer: string;
}
