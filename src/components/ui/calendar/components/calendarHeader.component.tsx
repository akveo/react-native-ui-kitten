/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button } from '../../button/button.component';
import {
  ChevronDown,
  ChevronDownElement,
  ChevronDownProps,
} from '../../support/components/chevronDown.component';
import {
  ChevronLeft,
  ChevronLeftElement,
  ChevronLeftProps,
} from '../../support/components/chevronLeft.component';
import {
  ChevronRight,
  ChevronRightElement,
  ChevronRightProps,
} from '../../support/components/chevronRight.component';
import { I18nLayoutService } from '../../support/services';

interface ComponentProps extends ViewProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: ImageStyle;
  lateralNavigationAllowed: boolean;
  onTitlePress?: () => void;
  onNavigationLeftPress?: () => void;
  onNavigationRightPress?: () => void;
}

export type CalendarHeaderProps = ComponentProps;
export type CalendarHeaderElement = React.ReactElement<CalendarHeaderProps>;

export class CalendarHeader extends React.Component<CalendarHeaderProps> {

  private renderTitleIcon = (): ChevronDownElement => {
    const { tintColor, ...svgProps } = this.props.iconStyle;

    return (
      <ChevronDown
        style={styles.headerButtonIcon}
        fill={tintColor}
        {...svgProps as ChevronDownProps}
      />
    );
  };

  private renderLeftIcon = (): ChevronLeftElement => {
    const { tintColor, ...svgProps } = this.props.iconStyle;
    const IconComponent: React.ComponentType<SvgProps> = I18nLayoutService.select(ChevronLeft, ChevronRight);

    return (
      <IconComponent
        style={styles.lateralIcon}
        fill={tintColor}
        {...svgProps as ChevronLeftProps}
      />
    );
  };

  private renderRightIcon = (): ChevronRightElement => {
    const { tintColor, ...svgProps } = this.props.iconStyle;
    const IconComponent: React.ComponentType<SvgProps> = I18nLayoutService.select(ChevronRight, ChevronLeft);

    return (
      <IconComponent
        style={styles.lateralIcon}
        fill={tintColor}
        {...svgProps as ChevronRightProps}
      />
    );
  };

  private renderLateralNavigationControls = (): React.ReactElement<ViewProps> => {
    return (
      <View style={styles.subContainer}>
        <Button
          style={styles.headerButton}
          appearance='ghost'
          // @ts-ignore
          icon={this.renderLeftIcon}
          onPress={this.props.onNavigationLeftPress}
        />
        <Button
          style={styles.headerButton}
          appearance='ghost'
          // @ts-ignore
          icon={this.renderRightIcon}
          onPress={this.props.onNavigationRightPress}
        />
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, titleStyle, onTitlePress, title, lateralNavigationAllowed, ...restProps } = this.props;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Button
          style={styles.headerButton}
          appearance='ghost'
          textStyle={[titleStyle, styles.headerButtonText]}
          // @ts-ignore
          icon={this.renderTitleIcon}
          onPress={onTitlePress}>
          {title}
        </Button>
        {lateralNavigationAllowed && this.renderLateralNavigationControls()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row-reverse',
  },
  headerButtonText: {
    marginHorizontal: 0,
  },
  headerButtonIcon: {
    marginHorizontal: 0,
  },
  lateralIcon: {
    marginHorizontal: 0,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
