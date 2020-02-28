/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TopNavigationStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'control' | string;
}>;

export interface TopNavigationProps extends ViewProps, TopNavigationStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  subtitle?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp;
  accessoryRight?: RenderProp;
  alignment?: AlignmentProp;
}

export type TopNavigationElement = React.ReactElement<TopNavigationProps>;

type AlignmentProp = 'start' | 'center';

/**
 * `TopNavigation` component is designed to be a Navigation Bar.
 * Can be used for navigation.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default`, `control`.
 * Default is `default`.
 *
 * @property {string | (props: TextProps) => ReactElement} title - A string or a function component
 * to render within the top navigation.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string | (props: TextProps) => ReactElement} subtitle - A string or a function component
 * to render within the top navigation.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string} alignment - Determines the alignment of the component.
 * Can be `center` or `start`.
 * Default is `start`.
 *
 * @property {() => ReactElement} accessoryLeft - A function component
 * to render to the left edge the top navigation.
 *
 * @property {() => ReactElement} accessoryLeft - A function component
 * to render to the right edge the top navigation.
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

  private getAlignmentDependentStyles = (alignment: AlignmentProp) => {
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

  private getComponentStyle = (source: StyleType) => {
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
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, title, subtitle, alignment, accessoryLeft, accessoryRight, ...viewProps } = this.props;

    const evaStyles = this.getComponentStyle(eva.style);
    const alignmentStyles = this.getAlignmentDependentStyles(alignment);

    return (
      <View
        style={[evaStyles.container, styles.container, alignmentStyles.container, style]}
        {...viewProps}>
        <View style={styles.leftControlContainer}>
          <FalsyFC component={accessoryLeft}/>
        </View>
        <View style={alignmentStyles.titleContainer}>
          <FalsyText
            style={evaStyles.title}
            component={title}
          />
          <FalsyText
            style={evaStyles.subtitle}
            component={subtitle}
          />
        </View>
        <View style={[styles.rightControlsContainer, alignmentStyles.rightControlsContainer]}>
          <FalsyFC component={accessoryRight}/>
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
  titleContainerCentered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
