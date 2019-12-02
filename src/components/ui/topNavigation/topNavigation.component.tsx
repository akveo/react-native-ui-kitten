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
import { TopNavigationActionElement } from './topNavigationAction.component';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { isValidString } from '../support/services';

type ActionElementProp = TopNavigationActionElement | TopNavigationActionElement[];
type AlignmentProp = 'start' | 'center';

interface ComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  alignment?: AlignmentProp;
  leftControl?: TopNavigationActionElement;
  rightControls?: ActionElementProp;
}

export type TopNavigationProps = StyledComponentProps & ViewProps & ComponentProps;
export type TopNavigationElement = React.ReactElement<TopNavigationProps>;

/**
 * `TopNavigation` component is designed to be a Navigation Bar.
 * Can be used for navigation.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the component.
 *
 * @property {string} subtitle - Determines the subtitle of the component.
 *
 * @property {string} alignment - Determines the alignment of the component.
 * Can be `center` or `start`.
 * Default is `start`.
 *
 * @property {ReactElement<TopNavigationActionProps>} leftControl - Determines the left control of the component.
 *
 * @property {ReactElement<TopNavigationActionProps>[]} rightControls - Determines the right controls of the component.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes text style of title.
 *
 * @property {StyleProp<TextStyle>} subtitleStyle - Customizes text style of subtitle.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TopNavigationSimpleUsage
 *
 * @overview-example TopNavigationActions
 *
 * @overview-example TopNavigationAlignments
 *
 * @overview-example TopNavigationWithMenu
 *
 * @example TopNavigationInlineStyling
 */
export class TopNavigationComponent extends React.Component<TopNavigationProps> {

  static styledComponentName: string = 'TopNavigation';

  private getAlignmentDependentStyles = (alignment: AlignmentProp): StyleType => {
    if (alignment === 'center') {
      return {
        container: styles.containerCentered,
        titleContainer: styles.titleContainerCentered,
      };
    }

    return {
      rightControlsContainer: styles.rightControlsContainerStart,
    };
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      titleTextAlign,
      titleFontFamily,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleColor,
      subtitleTextAlign,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleLineHeight,
      subtitleFontWeight,
      subtitleColor,
      ...containerParameters
    } = source;


    return {
      container: containerParameters,
      titleContainer: {},
      title: {
        textAlign: titleTextAlign,
        fontFamily: titleFontFamily,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor,
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontFamily: subtitleFontFamily,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
        lineHeight: subtitleLineHeight,
      },
      leftControlContainer: {},
      rightControlsContainer: {},
    };
  };

  private renderTextElement = (text: string, style: StyleProp<TextStyle>): TextElement => {
    return (
      <Text style={style}>
        {text}
      </Text>
    );
  };

  private renderActionElements(source: ActionElementProp): TopNavigationActionElement[] {
    return React.Children.map(source, (element: TopNavigationActionElement, index: number) => {
      return React.cloneElement(element, {
        key: index,
        appearance: this.props.appearance,
      });
    });
  }

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const {
      title,
      subtitle,
      leftControl,
      rightControls,
      titleStyle,
      subtitleStyle,
    } = this.props;

    return [
      isValidString(title) && this.renderTextElement(title, [style.title, styles.title, titleStyle]),
      isValidString(subtitle) && this.renderTextElement(subtitle, [style.subtitle, styles.subtitle, subtitleStyle]),
      leftControl && this.renderActionElements(leftControl),
      rightControls && this.renderActionElements(rightControls),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, alignment, ...restProps } = this.props;

    const {
      container,
      leftControlContainer,
      titleContainer,
      rightControlsContainer,
      ...componentStyles
    } = this.getComponentStyle(themedStyle);

    const alignmentStyles: StyleType = this.getAlignmentDependentStyles(alignment);

    const [
      titleElement,
      subtitleElement,
      leftControlElement,
      rightControlElements,
    ] = this.renderComponentChildren(componentStyles);

    return (
      <View
        style={[container, styles.container, alignmentStyles.container, style]}
        {...restProps}>
        <View style={[leftControlContainer, styles.leftControlContainer]}>
          {leftControlElement}
        </View>
        <View style={[titleContainer, styles.titleContainer, alignmentStyles.titleContainer]}>
          {titleElement}
          {subtitleElement}
        </View>
        <View style={[rightControlsContainer, styles.rightControlsContainer, alignmentStyles.rightControlsContainer]}>
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
  containerCentered: {
    justifyContent: 'space-between',
  },
  titleContainer: {},
  titleContainerCentered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
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
  rightControlsContainerStart: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const TopNavigation = styled<TopNavigationProps>(TopNavigationComponent);
