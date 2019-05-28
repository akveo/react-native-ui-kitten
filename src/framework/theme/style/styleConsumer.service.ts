import {
  ControlThemedStyleType,
  ControlMetaType,
  ThemedStyleType,
  ThemeStyleType,
} from '@eva-design/dss';
import {
  ContextProps,
  StyledComponentProps,
} from './styleConsumer.component';
import { createThemedStyle } from './style.service';
import { Interaction } from './type';

const SEPARATOR_MAPPING_ENTRY: string = '.';

interface StyleInfo {
  appearance: string;
  variants: string[];
  states: string[];
}

export class StyleConsumerService {

  private readonly name: string;
  private readonly meta: ControlMetaType;

  constructor(name: string, context: ContextProps) {
    this.name = name;

    this.meta = this.safe(context.style[name], (generatedConfig): ControlMetaType => {
      return generatedConfig.meta;
    });
  }

  public createDefaultProps<P extends object>(): StyledComponentProps {
    const appearance: string = this.getDefaultAppearance();
    const variants: { [key: string]: string } = this.getDefaultVariants();
    const states: { [key: string]: boolean } = this.getDefaultStates();

    return { appearance, ...variants, ...states };
  }

  public withStyledProps<P extends object>(source: P,
                                           context: ContextProps,
                                           interaction: Interaction[]): P & StyledComponentProps {

    const styleInfo: StyleInfo = this.getStyleInfo(source, interaction);

    const generatedMapping: ThemedStyleType = this.getGeneratedStyleMapping(context.style, styleInfo);
    const mapping = this.withValidParameters(generatedMapping);

    return {
      ...source,
      theme: context.theme,
      themedStyle: createThemedStyle(mapping, context.theme),
    };
  }

  private getGeneratedStyleMapping<P extends StyledComponentProps>(style: ThemeStyleType,
                                                                   info: StyleInfo): ThemedStyleType {

    return this.safe(style[this.name], (componentStyles: ControlThemedStyleType): ThemedStyleType => {
      const styleKeys: string[] = Object.keys(componentStyles.styles);
      const query: string = this.findGeneratedQuery(info, styleKeys);

      return componentStyles.styles[query];
    });
  }

  private withValidParameters(mapping: ThemedStyleType): ThemedStyleType {
    const invalidParameters: string[] = [];

    Object.keys(mapping).forEach((key: string) => {
      if (!Object.keys(this.meta.parameters).includes(key)) {
        invalidParameters.push(key);
        delete mapping[key];
      }
    });

    if (invalidParameters.length !== 0) {
      console.warn(
        `Before using these variables, describe them in the component configuration: ${invalidParameters}`,
      );
    }

    return mapping;
  }

  private getStyleInfo<P extends StyledComponentProps>(props: P, interaction: Interaction[]): StyleInfo {
    const variantProps: Partial<P> = this.getDerivedVariants(this.meta, props);
    const stateProps: Partial<P> = this.getDerivedStates(this.meta, props);

    const variants: string[] = Object.keys(variantProps).map((variant: string): string => {
      return variantProps[variant];
    });

    const states: string[] = Object.keys(stateProps);

    return {
      appearance: props.appearance,
      variants: variants,
      states: [...states, ...interaction],
    };
  }

  private getDefaultAppearance(): string {
    const matches: string[] = Object.keys(this.meta.appearances).filter((appearance: string): boolean => {
      return this.meta.appearances[appearance].default === true;
    });

    return matches[matches.length - 1];
  }

  private getDefaultVariants(): { [key: string]: any } {
    return this.transformObject(this.meta.variantGroups, (variants, group: string): string | undefined => {
      return Object.keys(variants[group]).find((variant: string): boolean => {

        return variants[group][variant].default === true;
      });
    });
  }

  private getDefaultStates(): { [key: string]: any } {
    return this.transformObject(this.meta.states, (states, state: string): boolean | undefined => {
      const isDefault: boolean = states[state].default === true;

      return isDefault ? isDefault : undefined;
    });
  }

  private getDerivedVariants<P extends StyledComponentProps>(meta: ControlMetaType, props: P): Partial<P> {
    return this.transformObject(props, (p: P, prop: string): string | undefined => {
      const isVariant: boolean = Object.keys(meta.variantGroups).includes(prop);

      return isVariant ? p[prop] : undefined;
    });
  }

  private getDerivedStates<P extends StyledComponentProps>(meta: ControlMetaType, props: P): Partial<P> {
    return this.transformObject(props, (p: P, prop: string): boolean => {
      const isState: boolean = Object.keys(meta.states).includes(prop);
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
    return Object.keys(value).reduce((acc: Partial<V>, key: string): any => {
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
   * info = { appearance: 'default', variants: ['small', 'error'], states: ['checked'] }
   *
   * will return ['default', 'error', 'small', 'checked']
   *
   * @param info (StyleInfo) - component style info
   * @param source (string[]) - array of style keys
   *
   * @return (string | undefined) - key identical to some of `source` keys if presents
   */
  private findGeneratedQuery(info: StyleInfo, source: string[]): string | undefined {
    const query: string[] = [
      info.appearance,
      ...info.variants,
      ...info.states,
    ];

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
   * @param fallback (R) - fallback value to return. Optional
   *
   * @return (R | undefined) - object returned by `reducer` if `value` is not `undefined`, `fallback` otherwise
   **/
  private safe<T, R>(value: T | undefined, reducer: (value: T) => R, fallback?: R): R | undefined {
    if (value) {
      return reducer(value);
    }

    return fallback;
  }
}
