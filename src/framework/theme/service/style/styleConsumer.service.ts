import { createStyle } from 'eva/packages/processor/kitten';
import {
  StyleMappingType,
  ThemeMappingType,
  ThemeMapType,
  ComponentMapMetaType,
} from 'eva/packages/common';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';

const SEPARATOR_MAPPING_ENTRY: string = '.';

interface ComponentStyleMetaType {
  appearance: string;
  variants: string[];
  states: string[];
}

export class StyleConsumerService {

  /**
   * @param mapping (ThemeMappingType) - theme mapping configuration
   * @param styles (ThemeMappingType) - styles theme mapping configuration
   * @param component (string) - component name
   * @param props (StyledComponentProps) - component props
   * @param interaction (Interaction[]) - component interaction
   *
   * @return pre-processed style if exists, creates it otherwise
   */
  public getComponentStyleMapping<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                                  styles: ThemeMapType,
                                                                  component: string,
                                                                  props: P,
                                                                  interaction: Interaction[]): StyleMappingType {

    const generatedMapping: StyleMappingType = this.safe(styles[component], (componentMapping) => {
      const { appearance, variants, states } = this.createStyleMeta(componentMapping.meta, props);

      const query: string = this.findGeneratedQuery(Object.keys(componentMapping), [
        appearance,
        ...variants,
        ...interaction,
        ...states,
      ]);

      return componentMapping[query];
    });

    if (generatedMapping === undefined && mapping[component] !== undefined) {
      const { appearance, variants, states } = this.createStyleMeta(mapping[component].meta, props);

      return createStyle(mapping, component, appearance, variants, [...interaction, ...states]);
    }

    return generatedMapping;
  }

  /**
   * @param meta (ComponentMapMetaType) - component configuration meta
   * @param props (P extends StyledComponentProps) - derived props
   *
   * @return meta (ComponentStyleMetaType) on style applied to component
   */
  private createStyleMeta<P extends StyledComponentProps>(meta: ComponentMapMetaType,
                                                          props: P): ComponentStyleMetaType {

    return {
      appearance: props.appearance,
      variants: this.getDerivedVariants(Object.keys(meta.variants), props),
      states: this.getDerivedStates(meta.states, props),
    };
  }

  /**
   * @param source (string[]) - array containing possible variant groups
   * @param props (P extends StyledComponentProps) - derived props
   *
   * @return variants (string[]) included in derived props
   */
  private getDerivedVariants<P extends StyledComponentProps>(source: string[], props: P): string[] {
    const derivedGroups: string[] = Object.keys(props).filter((prop: string): boolean => {
      return source.includes(prop);
    });

    return derivedGroups.map((group: string): string => props[group]);
  }

  /**
   * @param source (string[]) - array containing possible states
   * @param props (P extends StyledComponentProps) - derived props
   *
   * @return states (string[]) included in derived props
   */
  private getDerivedStates<P extends StyledComponentProps>(source: string[], props: P): string[] {
    const derivedStates: string[] = Object.keys(props).filter((prop: string): boolean => {
      return props[prop] === true && source.includes(prop);
    });

    return derivedStates.map((state: string): State => State.parse(state));
  }

  /**
   * Finds identical keys across `source` keys array
   *
   * Example:
   *
   * source = ['default.error.small.checked', ...]
   * query = ['default', 'small', 'error', 'checked']
   *
   * will return ['default', 'error', 'small', 'checked']
   *
   * @param source (string[]) - array of style keys
   * @param query (string[]) - array of key parts to search
   *
   * @return (string | undefined) - key identical to some of `source` keys if presents
   */
  private findGeneratedQuery(source: string[], query: string[]): string | undefined {
    const matches: string[] = source.filter((key: string): boolean => {
      const keyQuery: string[] = key.split(SEPARATOR_MAPPING_ENTRY);
      return this.compareArrays(query, keyQuery);
    });

    return matches[0];
  }

  /**
   * @param lhs (string[]) - comparable array
   * @param rhs (string[]) - comparing array
   *
   * @return true if all of lhs keys are included in rhs
   */
  private compareArrays(lhs: string[], rhs: string[]): boolean {
    if (lhs.length !== rhs.length) {
      return false;
    }

    return lhs.reduce((acc: boolean, current: string): boolean => acc && rhs.includes(current), true);
  }

  /**
   * Safely retrieves R value of T object with reducer
   *
   * @param value (T | undefined) - unsafe object which should be processed
   * @param reducer ((T) => R) - `value` processing lambda. Called if `value` is not `undefined`
   *
   * @return (R | undefined) - object returned by `reducer` if `value` is not `undefined`, `undefined` otherwise
   **/
  private safe<T, R>(value: T | undefined, reducer: (value: T) => R): R | undefined {
    if (value) {
      return reducer(value);
    }

    return undefined;
  }
}
