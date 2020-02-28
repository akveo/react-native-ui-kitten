/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
  Platform,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ChildrenWithProps,
  FalsyFC,
  FalsyText,
  Frame,
  MeasureElement,
  MeasuringElement,
  PropsService,
  RenderProp,
  TouchableWithoutFeedback,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';
import { ChevronDown } from '../shared/chevronDown.component';

export interface MenuItemProps extends TouchableOpacityProps, StyledComponentProps {
  title?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  children?: ChildrenWithProps<any>;
}

export type MenuItemElement = React.ReactElement<MenuItemProps>;

interface State {
  submenuHeight: number;
}

/**
 * `MenuItem` component is a part of the `Menu`.
 * Menu items should be passed to in Menu as children to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {string | (props: TextProps) => ReactElement} title - A string or a function component
 * to render within the button.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the `title`.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the `title`.
 * Called with props provided by Eva.
 *
 * @property {boolean} selected
 *
 * @property {ReactElement | ReactElement[]} children - One or several components to render as `submenu`.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 */
class MenuItemComponent extends React.Component<MenuItemProps, State> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'MenuItem';

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);
  private expandAnimation: Animated.Value = new Animated.Value(0);

  public state: State = {
    submenuHeight: 1,
  };

  private get hasSubmenu(): boolean {
    return React.Children.count(this.props.children) > 0;
  }

  private get shouldMeasureSubmenu(): boolean {
    return this.state.submenuHeight === 1;
  }

  private get expandAnimationValue(): number {
    // @ts-ignore - private api, but let's us avoid creating animation listeners.
    // `this.expandAnimation.addListener`
    return this.expandAnimation._value;
  }

  private get expandToRotateInterpolation(): Animated.AnimatedInterpolation {
    return this.expandAnimation.interpolate({
      inputRange: [-this.state.submenuHeight, 0],
      outputRange: ['-180deg', '0deg'],
    });
  }

  private get submenuStyle(): ViewStyle {
    // @ts-ignore - issue of `@types/react-native` package
    return this.shouldMeasureSubmenu ? styles.outscreen : { height: this.expandAnimation };
  }

  public onMouseEnter = (): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.eva.dispatch([]);
  };

  public onFocus = (): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.eva.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    if (this.hasSubmenu) {
      const expandValue: number = this.expandAnimationValue > 0 ? 0 : this.state.submenuHeight;
      this.createExpandAnimation(expandValue).start();
      return;
    }

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private onSubmenuMeasure = (frame: Frame): void => {
    this.setState({ submenuHeight: frame.size.height });
  };

  private getComponentStyle = (style: StyleType) => {
    const { paddingHorizontal, paddingVertical, backgroundColor } = style;

    const titleStyles: StyleType = PropsService.allWithPrefix(style, 'title');
    const indicatorStyles: StyleType = PropsService.allWithPrefix(style, 'indicator');
    const iconStyles: StyleType = PropsService.allWithPrefix(style, 'icon');

    return {
      container: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
      },
      title: {
        marginHorizontal: titleStyles.titleMarginHorizontal,
        fontFamily: titleStyles.titleFontFamily,
        fontSize: titleStyles.titleFontSize,
        fontWeight: titleStyles.titleFontWeight,
        lineHeight: titleStyles.titleLineHeight,
        color: titleStyles.titleColor,
      },
      indicator: {
        width: indicatorStyles.indicatorWidth,
        backgroundColor: indicatorStyles.indicatorBackgroundColor,
      },
      icon: {
        width: iconStyles.iconWidth,
        height: iconStyles.iconHeight,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
    };
  };

  private createExpandAnimation = (toValue: number): Animated.CompositeAnimation => {
    return Animated.timing(this.expandAnimation, {
      toValue: toValue,
      duration: 200,
    });
  };

  private renderSubmenuIconIfNeeded = (evaStyle): React.ReactElement => {
    if (!this.hasSubmenu) {
      return null;
    }

    return (
      <Animated.View style={{ transform: [{ rotate: this.expandToRotateInterpolation }] }}>
        <ChevronDown {...evaStyle} />
      </Animated.View>
    );
  };

  private renderSubmenu = (evaStyle): React.ReactElement<ViewProps> => {
    return (
      <Animated.View style={[this.submenuStyle, evaStyle]}>
        {this.props.children}
      </Animated.View>
    );
  };

  private renderMeasuringSubmenu = (evaStyle): MeasuringElement => {
    return (
      <MeasureElement onMeasure={this.onSubmenuMeasure}>
        {this.renderSubmenu(evaStyle)}
      </MeasureElement>
    );
  };

  private renderSubmenuIfNeeded = (evaStyle): React.ReactNode => {
    if (!this.hasSubmenu) {
      return null;
    }

    return this.shouldMeasureSubmenu ? this.renderMeasuringSubmenu(evaStyle) : this.renderSubmenu(evaStyle);
  };

  public render(): React.ReactNode {
    const { eva, style, title, accessoryLeft, accessoryRight, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <React.Fragment>
        <TouchableWithoutFeedback
          {...touchableProps}
          {...this.webEventResponder.eventHandlers}
          style={[styles.container, evaStyle.container, webStyles.container, style]}
          onPress={this.onPress}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}>
          <View style={[styles.indicator, evaStyle.indicator]}/>
          <View style={styles.subContainer}>
            <FalsyFC
              style={evaStyle.icon}
              component={accessoryLeft}
            />
            <FalsyText
              style={evaStyle.title}
              component={title}
            />
          </View>
          <FalsyFC
            style={evaStyle.icon}
            fallback={this.renderSubmenuIconIfNeeded(evaStyle.icon)}
            component={accessoryRight}
          />
        </TouchableWithoutFeedback>
        {this.renderSubmenuIfNeeded({})}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  outscreen: {
    position: 'absolute',
    left: -999,
    top: -999,
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const MenuItem = styled<MenuItemProps>(MenuItemComponent);
