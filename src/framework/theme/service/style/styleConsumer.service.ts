import { ComponentMappingType } from '../../component/mapping';
import { Props } from '../../component/style/styleConsumer.component';
import {
  Interaction,
  State,
} from '../../component/style/type';
import {
  APPEARANCE_DEFAULT,
  getAppearanceMappingSafe,
  getAppearanceVariants,
} from '../mapping/mapping.service';

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
                                           interaction: Interaction[] = []): string[] {

    const appearance = getAppearanceMappingSafe(mapping, APPEARANCE_DEFAULT, {});

    const states = Object.keys(props)
      .filter((key: string) => appearance.state[key])
      .map(state => props[state] && State.parse(state))
      .filter(Boolean);

    return [...interaction, ...states];
  }
}
