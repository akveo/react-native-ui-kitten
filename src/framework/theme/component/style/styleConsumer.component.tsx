import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  ThemeType,
  StyleType,
} from '../theme';
import {
  ThemeMappingType,
  ComponentMappingType,
  AppearanceType,
  VariantGroupType,
} from '../mapping';
import ThemeContext from '../theme/themeContext';
import MappingContext from '../mapping/mappingContext';
import {
  createStyle,
  getComponentMapping,
} from '../../service';

interface PrivateProps<T> {
  forwardedRef: React.RefObject<T>;
}

interface ConsumerProps {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export interface Props {
  appearance?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  requestStateStyle?: (state: string[] | string) => StyleType;
}

const DEFAULT_APPEARANCE_KEY_NAME: string = 'default';
const VARIANT_KEY_NAME: string = 'variant';

export const StyledComponent = <T extends React.Component, P extends object>(Component: React.ComponentClass<P>) => {

  type ComponentProps = Props & P;
  type WrapperProps = PrivateProps<T> & ComponentProps;

  class Wrapper extends React.Component<WrapperProps> {

    getComponentName = (): string => Component.displayName || Component.name;

    createComponentStyle = (theme: ThemeType,
                            mapping: ThemeMappingType,
                            variant: string[],
                            state: string[]): StyleType => { // todo: refactor

      if (state.length === 0) {
        console.warn('Redundant `requestStateStyle` call! Use `this.props.themedStyle` instead!');
      }
      return createStyle(theme, mapping, '', variant, state);
    };

    hasComponentAppearance = (appearanceProp: string): boolean => appearanceProp && appearanceProp.length !== 0;

    hasVariantPropKey = (variant: VariantGroupType, propKey: string): boolean =>
      Object.keys(variant).some((variantKey: string) => variantKey === propKey);

    hasAppearanceVariant = (appearance: AppearanceType): boolean => appearance.hasOwnProperty(VARIANT_KEY_NAME);

    hasAppearanceMappingPropKey = (appearance: AppearanceType, key: string): boolean => {
      return this.hasAppearanceVariant(appearance) && this.hasVariantPropKey(appearance[VARIANT_KEY_NAME], key);
    };

    getCurrentComponentMappingsVariants = (mapping: ThemeMappingType, componentProps: P & Props): string[] => {
      const defaultAppearance: AppearanceType = mapping.appearance[DEFAULT_APPEARANCE_KEY_NAME];
      const currentAppearance: AppearanceType = this.hasComponentAppearance(componentProps.appearance) ?
        mapping.appearance[componentProps.appearance] : mapping.appearance[DEFAULT_APPEARANCE_KEY_NAME];
      const matchedVariantsPropsKeys: string[] = Object.keys(componentProps)
        .map((key: string) => {
          if (this.hasAppearanceMappingPropKey(currentAppearance, key)) {
            return key;
          } else if (this.hasAppearanceMappingPropKey(defaultAppearance, key)) {
            return key;
          }
        })
        .filter(String);

      return Object.keys(componentProps)
        .filter((propsKey: string) => matchedVariantsPropsKeys.some((foundKey: string) => foundKey === propsKey))
        .map((key: string) => componentProps[key])
        .filter(String);
    };

    createCustomProps = (props: ConsumerProps, componentProps: P & Props): Props => {
      const mapping = getComponentMapping(props.mapping, this.getComponentName());
      const variants: string[] = this.getCurrentComponentMappingsVariants(mapping, componentProps);

      return { // todo: pass right params to createStyle
        appearance: componentProps.appearance,
        theme: props.theme,
        themedStyle: {}, // createStyle(props.theme, mapping, componentProps.appearance),
        // this.createComponentStyle(props.theme, mapping, componentProps.variant, state),
        requestStateStyle: state => {
        },
      };
    };

    renderWrappedComponent = (props: ConsumerProps) => {
      // TS issue: with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
      const { forwardedRef, ...restProps } = this.props as PrivateProps<T>;
      const componentProps = restProps as P & Props;
      return (
        <Component
          ref={forwardedRef}
          {...this.createCustomProps(props, componentProps)}
          {...componentProps}
        />
      );
    };

    render() {
      return (
        <MappingContext.Consumer>{(mapping: ThemeMappingType) => (
          <ThemeContext.Consumer>{(theme: ThemeType) => {
            return this.renderWrappedComponent({ mapping: mapping, theme: theme });
          }}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
      );
    }
  }

  const RefForwardingFactory = (props: WrapperProps, ref: T) => {
    return (
      <Wrapper {...props} forwardedRef={ref}/>
    );
  };

  const RefForwardingComponent = React.forwardRef<T, P>(RefForwardingFactory as any);

  RefForwardingComponent.displayName = Component.displayName || Component.name;
  hoistNonReactStatics(RefForwardingComponent, Component);

  return RefForwardingComponent;
};
