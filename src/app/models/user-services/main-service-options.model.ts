import { Expose } from 'class-transformer';

export class MainOptions {
  @Expose() title: string;
  @Expose() basic: boolean;
  @Expose() advanced: boolean;
  @Expose() premium: boolean;
}
