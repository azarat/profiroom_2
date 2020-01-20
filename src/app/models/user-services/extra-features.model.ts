import { Expose } from 'class-transformer';

export class ExtraFeatures {
  @Expose() optionPublish: boolean;
  @Expose() optionTitle: string;
  @Expose() optionDescription: string;
  @Expose() optionPrice: string;
  @Expose() optionCountDays: string;
}
