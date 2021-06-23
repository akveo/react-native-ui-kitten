/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TabStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface TabProps extends TouchableWebProps, TabStyledProps {
  children?: React.ReactElement;
  title?: RenderProp<TextProps> | React.ReactText;
  icon?: RenderProp<Partial<ImageProps>>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type TabElement = React.ReactElement<TabProps>;

/**
 * A single tab within the TabView or TabBar.
 * Tabs should be rendered within TabView or TabBar to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement} children - A component displayed below the tab.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the tab.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} icon - Function component
 * to render within the tab.
 * Expected to return an Image.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TabSimpleUsage
 */
@styled('Tab')
export class Tab extends React.Component<TabProps> {

  static defaultProps: Partial<TabProps> = {
    selected: false,
  };

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(event);
  };

  private onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(event);
  };

  private onPress = (): void => {
    this.props.onSelect && this.props.onSelect(!this.props.selected);
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      textMarginVertical,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
      },
      title: {
        marginVertical: textMarginVertical,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        color: textColor,
      },
    };
  };

  public render(): TouchableWebElement {
    const { eva, style, title, icon, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, styles.container, style]}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onPress={this.onPress}>
        <FalsyFC
          style={evaStyle.icon}
          component={icon}
        />
        <FalsyText
          style={evaStyle.title}
          component={title}
        />
      </TouchableWeb>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
