import {
  Expose,
  Type
} from 'class-transformer';


export class ExtraFeaturesList {
  @Expose() extraСhanges: string;
  @Expose() extraСommercial: string;
  @Expose() extraTerms: string;
  @Expose() extraFeatureTitle: string;
  // tslint:disable-next-line: no-use-before-declare
  @Type(() => ExtraFeatures) extraFeatures: ExtraFeatures[];
}

export class ExtraFeatures {
  @Expose() title: string;
  @Expose() price: number;
}
