import {
  Expose,
  Type
} from 'class-transformer';


export class ExtraFeaturesModel {
  @Expose() extraСhanges: boolean;
  @Expose() extraCommercial: boolean;
  @Expose() extraTerms: boolean;
  @Expose() extraFeatureTitle: string;
  // tslint:disable-next-line: no-use-before-declare
  @Type(() => ExtraFeatures) extraFeatures: ExtraFeatures[];
}

export class ExtraFeatures {
  @Expose() title: string;
  @Expose() price: number;
}
