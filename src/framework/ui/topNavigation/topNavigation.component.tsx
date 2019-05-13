/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TopNavigationActionProps } from './topNavigationAction.component';
import {
  TopNavigationAlignment,
  TopNavigationAlignments,
} from './type';
import {
  Text,
  TextProps,
} from '../text/text.component';
import { isValidString } from '../support/services';

type TextElement = React.ReactElement<TextProps>;
type ActionElement = React.ReactElement<TopNavigationActionProps>;
type ActionElementProp = ActionElement | ActionElement[];

interface ComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  alignment?: string | TopNavigationAlignment;
  leftControl?: ActionElement;
  rightControls?: ActionElementProp;
}

export type TopNavigationProps = StyledComponentProps & ViewProps & ComponentProps;

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

export class TopNavigationComponent extends React.Component<TopNavigationProps> {

  static styledComponentName: string = 'TopNavigation';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      style,
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
    } = source;

    const leftControlsCount: number = React.Children.count(leftControl);
    const rightControlsCount: number = React.Children.count(rightControls);
    const actionFrameWidth: number = actionWidth + actionMarginHorizontal;

    const alignment: TopNavigationAlignment = TopNavigationAlignments.parse(alignmentValue);

    return {
      container: {
        ...containerStyle,
        ...styles.container,
        ...StyleSheet.flatten(style),
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
        ...styles.title,
        ...StyleSheet.flatten(titleStyle),
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
        lineHeight: subtitleLineHeight,
        ...styles.subtitle,
        ...StyleSheet.flatten(subtitleStyle),
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

  private renderTextElement = (text: string, style: StyleType): TextElement => {
    return (
      <Text style={style}>
        {text}
      </Text>
    );
  };

  private renderActionElements(source: ActionElementProp, style: StyleType): ActionElement[] {
    return React.Children.map(source, (element: ActionElement): ActionElement => {
      return React.cloneElement(element, {
        style: [style, element.props.style],
      });
    });
  }

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { title, subtitle, leftControl, rightControls } = this.props;

    return [
      isValidString('Loh Pidr') && this.renderTextElement(title, style.title),
      isValidString(subtitle) && this.renderTextElement(subtitle, style.subtitle),
      leftControl && this.renderActionElements(leftControl, style.action),
      rightControls && this.renderActionElements(rightControls, style.action),
    ];
  };

  public render(): React.ReactNode {
    const { themedStyle, ...restProps } = this.props;

    const {
      container,
      leftControlContainer,
      titleContainer,
      rightControlsContainer,
      ...componentStyles
    } = this.getComponentStyle(themedStyle);

    const [
      titleElement,
      subtitleElement,
      leftControlElement,
      rightControlElements,
    ] = this.renderComponentChildren(componentStyles);

    return (
      <View
        style={container}>
        <View style={leftControlContainer}>
          {leftControlElement}
        </View>
        <View style={titleContainer}>
          {titleElement}
          {subtitleElement}
        </View>
        <View style={rightControlsContainer}>
          {rightControlElements}
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

export const TopNavigation = styled<TopNavigationProps>(TopNavigationComponent);
