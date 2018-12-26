import { ComponentMappingType } from '../component';
import { Props } from '../component/style/styleConsumer.component';
import {
  APPEARANCE_DEFAULT,
  getAppearanceVariants,
} from './mappingUtil.service';

export class StyleConsumerService {

  public getVariantPropKeys<P extends Props>(mapping: ComponentMappingType, props: P): string[] {
    const variants = getAppearanceVariants(mapping, APPEARANCE_DEFAULT);
    if (variants === undefined) {
      return [];
    }
    return Object.keys(props)
      .filter((key: string) => variants[key])
      .map((key: string) => props[key]);
  }
}
