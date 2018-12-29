import {
  ComponentMappingType,
  Action,
} from '../component';
import { Props } from '../component/style/styleConsumer.component';
import {
  APPEARANCE_DEFAULT,
  getAppearanceMappingSafe,
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

  public getStatePropKeys<P extends Props>(mapping: ComponentMappingType,
                                           props: P,
                                           action: Action = Action.STATELESS): string[] {

    const appearance = getAppearanceMappingSafe(mapping, APPEARANCE_DEFAULT, {});

    const states = Object.keys(props)
      .filter((key: string) => appearance.state[key])
      .map(state => props[state] && Action.parse(state))
      .filter(Boolean);

    return action === Action.STATELESS ? states : [action, ...states];
  }
}
