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
import { RTLService } from '../../../devsupport';
import { Button } from '../../button/button.component';
import {
  Text,
  TextProps,
} from '../../text/text.component';
import {
  ChevronDown,
  ChevronDownElement,
} from '../../shared/chevronDown.component';
import {
  ChevronLeft,
  ChevronLeftElement,
} from '../../shared/chevronLeft.component';
import {
  ChevronRight,
  ChevronRightElement,
} from '../../shared/chevronRight.component';
import {
  CalendarViewModeId,
  CalendarViewModes,
} from '@ui-kitten/components/ui/calendar/type';

export interface CalendarHeaderProps extends ViewProps {
  viewModeId: CalendarViewModeId;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: ImageStyle;
  lateralNavigationAllowed: boolean;
  onTitlePress?: () => void;
  onNavigationLeftPress?: () => void;
  onNavigationRightPress?: () => void;
}

export type CalendarHeaderElement = React.ReactElement<CalendarHeaderProps>;

export class CalendarHeader extends React.Component<CalendarHeaderProps> {

  private renderTitleIcon = (): ChevronDownElement => {
    const { tintColor, ...svgStyle } = this.props.iconStyle;
    const rotateStyle = this.props.viewModeId === CalendarViewModes.DATE.id
      ? {}
      : styles.rotateIcon;

    return (
      <ChevronDown
        style={[styles.headerButtonIcon, rotateStyle, svgStyle]}
        fill={tintColor}
      />
    );
  };

  private renderLeftIcon = (): ChevronLeftElement => {
    const { tintColor, ...svgStyle } = this.props.iconStyle;
    const IconComponent: React.ComponentType<SvgProps> = RTLService.select(ChevronLeft, ChevronRight);

    return (
      <IconComponent
        style={[styles.lateralIcon, svgStyle]}
        fill={tintColor}
      />
    );
  };

  private renderRightIcon = (): ChevronRightElement => {
    const { tintColor, ...svgStyle } = this.props.iconStyle;
    const IconComponent: React.ComponentType<SvgProps> = RTLService.select(ChevronRight, ChevronLeft);

    return (
      <IconComponent
        style={[styles.lateralIcon, svgStyle]}
        fill={tintColor}
      />
    );
  };

  private renderLateralNavigationControls = (): React.ReactElement<ViewProps> => {
    return (
      <View style={styles.subContainer}>
        <Button
          appearance='ghost'
          accessoryRight={this.renderLeftIcon}
          onPress={this.props.onNavigationLeftPress}
        />
        <Button
          appearance='ghost'
          accessoryRight={this.renderRightIcon}
          onPress={this.props.onNavigationRightPress}
        />
      </View>
    );
  };

  private renderTitleElement = (props: TextProps): React.ReactElement => {
    return (
      <Text
        {...props}
        style={[props.style, styles.headerButtonText, this.props.titleStyle]}>
        {this.props.title}
      </Text>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, titleStyle, onTitlePress, title, lateralNavigationAllowed, viewModeId, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[styles.container, style]}>
        <Button
          appearance='ghost'
          accessoryRight={this.renderTitleIcon}
          onPress={onTitlePress}>
          {(props) => this.renderTitleElement(props)}
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
  rotateIcon: {
    transform: [{ rotate: '180deg' }],
  },
});
