/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as ActionProps } from './topNavigationAction.component';
import {
  TopNavigationAlignment,
  TopNavigationAlignments,
} from './type';

type ActionElement = React.ReactElement<ActionProps>;

interface TopNavigationProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  alignment?: string | TopNavigationAlignment;
  leftControl?: ActionElement;
  rightControls?: ActionElement[];
}

export type Props = TopNavigationProps & StyledComponentProps & ViewProps;

/**
 * The `TopNavigation` component is a component that work like AppBar component.
 * Can be used for navigation for example.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the component.
 *
 * @property {string} subtitle - Determines the subtitle of the component.
 *
 * @property {string | TopNavigationAlignment} alignment - Determines the appearance of the component.
 * Can be 'default' | 'titleCentered'. By default appearance is 'default'.
 *
 * @property {React.ReactElement<ActionProps>} leftControl - Determines the left control
 * of the component.
 *
 * @property {React.ReactElement<ActionProps>[]} rightControls - Determines the right controls
 * of the component.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes text style of title
 *
 * @property {StyleProp<TextStyle>} subtitleStyle - Customizes text style of title
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example TopNavigationBar usage example
 *
 * ```
 * <TopNavigationBarComponent
 *   appearance='titleCentered'
 *   title='Top Navigation Bar'
 *   subtitle='Subtitle'
 *   leftControl={
 *                 <TopNavigationBarAction
 *                   icon={(style: StyleType) => <Image source={{ uri: leftControlUri }} style={style}/>}
 *                   onPress={() => {...}/>
 *               }
 *   rightControls={[
 *            <TopNavigationBarAction
 *              icon={(style: StyleType) => <Image source={{ uri: rightControlUri1 }} style={style}/>}
 *              onPress={() => {...}}/>,
 *            <TopNavigationBarAction
 *              icon={(style: StyleType) => <Image source={{ uri: rightControlUri2 }} style={style}/>}
 *              onPress={() => Alert.alert('On second right action')}/>]}/>
 * ```
 * */

export class TopNavigation extends React.Component<Props> {

  static styledComponentName: string = 'TopNavigation';

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      alignment: alignmentValue,
      leftControl,
      rightControls,
      titleStyle,
      subtitleStyle,
    } = this.props;

    const {
      titleTextAlign,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleColor,
      subtitleTextAlign,
      subtitleFontSize,
      subtitleLineHeight,
      subtitleFontWeight,
      subtitleColor,
      actionWidth,
      actionHeight,
      actionMarginHorizontal,
      ...containerStyle
    } = style;

    const leftControlsCount: number = React.Children.count(leftControl);
    const rightControlsCount: number = React.Children.count(rightControls);
    const actionFrameWidth: number = actionWidth + actionMarginHorizontal;

    const alignment: TopNavigationAlignment = TopNavigationAlignments.parse(alignmentValue);

    return {
      container: {
        ...containerStyle,
        ...styles.container,
      },
      titleContainer: {
        ...styles.titleContainer,
        marginLeft: alignment.margin(leftControlsCount, rightControlsCount, actionFrameWidth),
      },
      title: {
        textAlign: titleTextAlign,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor,
        ...StyleSheet.flatten(titleStyle),
        ...styles.title,
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
        lineHeight: subtitleLineHeight,
        ...StyleSheet.flatten(subtitleStyle),
        ...styles.subtitle,
      },
      action: {
        width: actionWidth,
        height: actionHeight,
        marginHorizontal: actionMarginHorizontal,
      },
      leftControlContainer: styles.leftControlContainer,
      rightControlsContainer: styles.rightControlsContainer,
    };
  };

  private renderTextElement = (text: string, style: StyleType): React.ReactElement<TextProps> => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  private renderTitleElement = (text: string, style: StyleType): React.ReactElement<TextProps> | null => {
    const isValid: boolean = text && text.length !== 0;

    return isValid ? this.renderTextElement(text, style) : null;
  };

  private renderActionElements(source: React.ReactNode, style: StyleType): ActionElement[] {
    return React.Children.map(source, (element: ActionElement): ActionElement => {
      return React.cloneElement(element, {
        style: [style, element.props.style],
      });
    });
  }

  public render(): React.ReactNode {
    const { style, themedStyle, title, subtitle, leftControl, rightControls, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View
        {...restProps}
        style={[componentStyle.container, style]}>
        <View style={componentStyle.leftControlContainer}>
          {this.renderActionElements(leftControl, componentStyle.action)}
        </View>
        <View style={componentStyle.titleContainer}>
          {this.renderTitleElement(title, componentStyle.title)}
          {this.renderTitleElement(subtitle, componentStyle.subtitle)}
        </View>
        <View style={componentStyle.rightControlsContainer}>
          {this.renderActionElements(rightControls, componentStyle.action)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {},
  subtitle: {},
  leftControlContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  rightControlsContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
});
