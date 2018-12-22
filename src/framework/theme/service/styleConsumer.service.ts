import {
  ComponentMappingType,
  VariantGroupType,
} from '../component';
import {
  APPEARANCE_DEFAULT,
  getAppearanceVariants,
} from './mappingUtil.service';
import { Props } from '../component/style/styleConsumer.component';

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
