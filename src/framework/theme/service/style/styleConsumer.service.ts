import {
  getStyle,
  createStyle,
  getComponentStates,
  getComponentVariantGroups,
  ThemeMappingType,
  StyleMappingType,
} from 'eva/rk-kit';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';

export class StyleConsumerService {

  public getComponentStyleMapping<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                                  component: string,
                                                                  props: P,
                                                                  appearance: string,
                                                                  interaction: Interaction[]): StyleMappingType {

    const variants: string[] = this.getVariantPropKeys(mapping, component, props);
    const states: string[] = this.getStatePropKeys(mapping, component, props, interaction);

    const styleMapping = getStyle(component, appearance, variants, states);

    if (styleMapping === undefined) {
      return createStyle(mapping, component, appearance, variants, states);
    }

    return styleMapping;
  }

  public getVariantPropKeys<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                            component: string,
                                                            props: P): string[] {

    const componentVariantGroups: string[] = getComponentVariantGroups(mapping, component);
    if (componentVariantGroups === undefined) {
      return [];
    }

    return Object.keys(props)
      .filter((key: string) => componentVariantGroups.includes(key))
      .map((key: string) => props[key]);
  }

  public getStatePropKeys<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                          component: string,
                                                          props: P,
                                                          interaction: Interaction[] = []): string[] {

    const componentStates = getComponentStates(mapping, component);

    const states = Object.keys(props)
      .filter((key: string) => componentStates.includes(key))
      .map(state => props[state] && State.parse(state))
      .filter(Boolean);

    return [...interaction, ...states];
  }
}
