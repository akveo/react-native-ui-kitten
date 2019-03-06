import { createStyle } from 'eva/packages/processor/kitten';
import {
  ComponentMappingType,
  ThemedStyleType,
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';
import { StyledComponentProps } from '../../component';
import { Interaction } from '../../type';

const SEPARATOR_MAPPING_ENTRY: string = '.';

interface ComponentStyleMetaType {
  appearance: string;
  variants: string[];
  states: string[];
}

export class StyleConsumerService {

  public withDefaultProps<P extends StyledComponentProps>(mapping: ThemeMappingType,
                                                          component: string,
                                                          props: P): P {

    const defaultProps = this.safe(mapping[component], (componentMapping: ComponentMappingType) => {
      const appearance: string = this.getDefaultAppearance(componentMapping);
      const variants: { [key: string]: string } = this.getDefaultVariants(componentMapping);
      const states: { [key: string]: boolean } = this.getDefaultStates(componentMapping);

      return { appearance, ...variants, ...states };
    });

    return { ...defaultProps, ...props };
  }

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
                                                                  styles: ThemeStyleType,
                                                                  component: string,
                                                                  props: P,
                                                                  interaction: Interaction[]): ThemedStyleType {

    return this.safe(mapping[component], (componentMapping: ComponentMappingType): ThemedStyleType => {
      const { appearance, variants, states } = this.getDerivedStyleMeta(componentMapping, props);

      const generatedStyles: ThemedStyleType = this.safe(styles[component], (componentStyles) => {
        const query: string = this.findGeneratedQuery(Object.keys(componentStyles), [
          appearance,
          ...variants,
          ...interaction,
          ...states,
        ]);

        return componentStyles[query];
      });

      if (generatedStyles === undefined) {
        return createStyle(mapping, component, appearance, variants, [...interaction, ...states]);
      }

      return generatedStyles;
    });
  }

  private getDerivedStyleMeta<P extends StyledComponentProps>(mapping: ComponentMappingType,
                                                              props: P): ComponentStyleMetaType {

    const variantProps: Partial<P> = this.getDerivedVariants(mapping, props);
    const stateProps: Partial<P> = this.getDerivedStates(mapping, props);

    const variants: string[] = Object.keys(variantProps).map((variant: string): string => {
      return variantProps[variant];
    });
    const states: string[] = Object.keys(stateProps);

    return {
      appearance: props.appearance,
      variants,
      states,
    };
  }

  private getDefaultAppearance(mapping: ComponentMappingType): string {
    return Object.keys(mapping.meta.appearances).find((appearance: string): boolean => {
      return mapping.meta.appearances[appearance].default === true;
    });
  }

  private getDefaultVariants(mapping: ComponentMappingType): { [key: string]: any } {
    return this.transformObject(mapping.meta.variants, (variants, group: string): string | undefined => {
      return Object.keys(variants[group]).find((variant: string): boolean => {

        return variants[group][variant].default === true;
      });
    });
  }

  private getDefaultStates(mapping: ComponentMappingType): { [key: string]: any } {
    return this.transformObject(mapping.meta.states, (states, state: string): boolean | undefined => {
      const isDefault: boolean = states[state].default === true;

      return isDefault ? isDefault : undefined;
    });
  }

  private getDerivedVariants<P extends StyledComponentProps>(mapping: ComponentMappingType,
                                                             props: P): Partial<P> {

    return this.transformObject(props, (p: P, prop: string): string | undefined => {
      const isVariant: boolean = Object.keys(mapping.meta.variants).includes(prop);

      return isVariant ? p[prop] : undefined;
    });
  }

  private getDerivedStates<P extends StyledComponentProps>(mapping: ComponentMappingType,
                                                           props: P): Partial<P> {

    return this.transformObject(props, (p: P, prop: string): boolean => {
      const isState: boolean = Object.keys(mapping.meta.states).includes(prop);
      const isAssigned: boolean = p[prop] === true;

      return isState && isAssigned;
    });
  }

  /**
   * Iterates throw `value` object keys and fills it values with values provided by `transform` callback
   * If `transform` returns `undefined`, then appends nothing
   *
   * @param value (V extends object) - object to transform
   * @param transform - object key transformation callback
   */
  private transformObject<V extends object>(value: V, transform: (value: V, key: string) => any): Partial<V> {
    return Object.keys(value).reduce((acc: Partial<V>, key: string) => {
      const nextValue: any = transform(value, key);

      return nextValue ? { ...acc, [key]: nextValue } : acc;
    }, {});
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
