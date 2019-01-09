import {
  getAppearanceVariants,
  getAppearanceVariantGroups,
  getAppearanceMappingStates,
  getVariantMappingStates,
  APPEARANCE_DEFAULT,
  ThemeMappingType,
} from 'eva';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';

export class StyleConsumerService {

  public getVariantPropKeys<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                            component: string,
                                                            props: P): string[] {

    const variantGroups: string[] = getAppearanceVariantGroups(mapping, component, APPEARANCE_DEFAULT);
    if (variantGroups === undefined) {
      return [];
    }

    return Object.keys(props)
      .filter((key: string) => variantGroups.includes(key))
      .map((key: string) => props[key]);
  }

  public getStatePropKeys<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                          component: string,
                                                          props: P,
                                                          interaction: Interaction[] = []): string[] {

    const appearanceStates = this.getAppearanceStates(mapping, component, APPEARANCE_DEFAULT);

    const states = Object.keys(props)
      .filter((key: string) => appearanceStates.includes(key))
      .map(state => props[state] && State.parse(state))
      .filter(Boolean);

    return [...interaction, ...states];
  }

  private getAppearanceStates(mapping: ThemeMappingType, component: string, appearance: string): string[] {
    const mappingStates: string[] = getAppearanceMappingStates(mapping, component, appearance) || [];

    const variantGroups: string[][] = getAppearanceVariants(mapping, component, appearance) || [];
    const variantStates: string[] = this.flatten(variantGroups).reduce((acc, variant) => {
      const states = getVariantMappingStates(mapping, component, appearance, variant) || [];
      return [...acc, ...states];
    }, []);

    return this.noDuplicates([...mappingStates, ...variantStates]);
  }

  private flatten<T>(params: T[][]): T[] {
    return [].concat(...params);
  }

  private noDuplicates<T>(params: T[]): T[] {
    return [...new Set(params)];
  }
}
