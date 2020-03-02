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
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebProps,
  TouchableWebElement,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TabStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface TabProps extends TouchableWebProps, TabStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  icon?: RenderProp<Partial<ImageProps>>;
  children?: React.ReactElement;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type TabElement = React.ReactElement<TabProps>;

/**
 * `Tab` component is a part of the `TabBar` or `TabView`.
 * Tabs should be wrapped in TabBar or TabView to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {string | (props: TextProps) => ReactElement} title - A string or a function component
 * to render within the tab.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string | (props: ImageProps) => ReactElement} icon - A function component
 * to render within the tab.
 * Called with props provided by Eva.
 *
 * @property {ReactElement} children - Determines the content element of the tab.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example TabSimpleUsage
 *
 * @overview-example TabWithIcon
 *
 * @example TabWithExternalSourceIcon
 *
 * @example TabInlineStyling
 */
export class TabComponent extends React.Component<TabProps> {

  static styledComponentName: string = 'Tab';

  static defaultProps: Partial<TabProps> = {
    selected: false,
  };

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  private onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private onPress = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      textMarginVertical,
      textFontFamily,
      textFontSize,
      textLineHeight,
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
        lineHeight: textLineHeight,
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

export const Tab = styled<TabProps>(TabComponent);
