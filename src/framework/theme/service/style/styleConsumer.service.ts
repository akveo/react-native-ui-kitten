import {
  getComponentStates,
  getComponentVariantGroups,
  ThemeMappingType,
} from 'eva/rk-kit';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';

export class StyleConsumerService {

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
