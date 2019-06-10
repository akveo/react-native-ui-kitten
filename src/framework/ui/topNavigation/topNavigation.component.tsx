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
  alignment?: 'start' | 'center';
  leftControl?: ActionElement;
  rightControls?: ActionElementProp;
}

export type TopNavigationProps = StyledComponentProps & ViewProps & ComponentProps;

/**
 * TopNavigation component is designed to be a Navigation Bar.
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
 *
 * @property {React.ReactElement<TopNavigationActionProps>} leftControl - Determines the left control
 * of the component.
 *
 * @property {React.ReactElement<TopNavigationActionProps>[]} rightControls - Determines the right controls
 * of the component.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes text style of title.
 *
 * @property {StyleProp<TextStyle>} subtitleStyle - Customizes text style of subtitle.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   TopNavigation,
 *   TopNavigationAction,
 *   TopNavigationActionProps,
 * } from 'react-native-ui-kitten';
 *
 * export const TopNavigationShowcase = (props?: TopNavigationProps): React.ReactElement<TopNavigationProps> => {
 *   return (
 *     <TopNavigation title='Title' />
 *   );
 * };
 * ```
 *
 * @example Actions usage example
 *
 * ```
 * import React from 'react';
 * import { Image, ImageProps } from 'react-native';
 * import {
 *   TopNavigation,
 *   TopNavigationAction,
 *   TopNavigationActionProps,
 * } from 'react-native-ui-kitten';
 *
 * export const TopNavigationShowcase = (props?: TopNavigationProps): React.ReactElement<TopNavigationProps> => {
 *
 *   private onLeftControlPress = () => {
 *     // Handle Left Control press
 *   };
 *
 *   const renderControlIcon = (style: StyleType): React.ReactElement<ImageProps> => {
 *     return (
 *       <Image
 *         style={style}
 *         source={{uri: 'https://path-to/awesome-image.png'}}
 *       />
 *     );
 *   };
 *
 *   const renderLeftControl = (): React.ReactElement<TopNavigationActionProps> => {
 *     return (
 *       <TopNavigationAction
 *         icon={this.renderControlIcon}
 *         onPress={this.onLeftControlPress}
 *       />
 *     );
 *   };
 *
 *   return (
 *     <TopNavigation
 *       title='Title'
 *       leftControl={this.renderLeftControl()}
 *     />
 *   );
 * };
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * import React from 'react';
 * import { TopNavigation, TopNavigationProps } from 'react-native-ui-kitten';
 *
 * export const TopNavigationShowcase = (props?: TopNavigationProps): React.ReactElement<TopNavigationProps> => {
 *   return (
 *     <TopNavigation
 *       title='Title'
 *       subtitle='Subtitle'
 *       titleStyle={styles.title}
 *       subtitleStyle={styles.subtitle}
 *     />
 *   );
 * };
 * ```
 * */

export class TopNavigationComponent extends React.Component<TopNavigationProps> {

  static styledComponentName: string = 'TopNavigation';

  private getAlignmentDependentStyles = (): StyleType | null => {
    const { alignment } = this.props;

    if (alignment === 'center') {
      return {
        container: styles.containerCentered,
        titleContainer: styles.titleContainerCentered,
      };
    } else {
      return {
        rightControlsContainer: styles.rightControlsContainerStart,
      };
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      style,
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
      ...containerStyle
    } = source;

    const alignmentDependentStyles: StyleType = this.getAlignmentDependentStyles();

    return {
      container: {
        ...containerStyle,
        ...styles.container,
        ...alignmentDependentStyles.container,
        ...StyleSheet.flatten(style),
      },
      titleContainer: {
        ...styles.titleContainer,
        ...alignmentDependentStyles.titleContainer,
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
      leftControlContainer: styles.leftControlContainer,
      rightControlsContainer: {
        ...styles.rightControlsContainer,
        ...alignmentDependentStyles.rightControlsContainer,
      },
    };
  };

  private renderTextElement = (text: string, style: StyleProp<TextStyle>): TextElement => {
    return (
      <Text style={style}>
        {text}
      </Text>
    );
  };

  private renderActionElements(source: ActionElementProp): ActionElement[] {
    return React.Children.map(source, (element: ActionElement, index: number): ActionElement => {
      return React.cloneElement(element, {
        key: index,
      });
    });
  }

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { title, subtitle, leftControl, rightControls } = this.props;

    return [
      isValidString(title) && this.renderTextElement(title, style.title),
      isValidString(subtitle) && this.renderTextElement(subtitle, style.subtitle),
      leftControl && this.renderActionElements(leftControl),
      rightControls && this.renderActionElements(rightControls),
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

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
        style={[container, style]}
        {...restProps}>
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
