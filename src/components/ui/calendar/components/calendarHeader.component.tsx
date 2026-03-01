/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback } from 'react';
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

interface IconStyle extends ImageStyle {
  tintColor?: string;
}

export interface CalendarHeaderProps extends ViewProps {
  viewModeId: CalendarViewModeId;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: IconStyle;
  lateralNavigationAllowed: boolean;
  onTitlePress?: () => void;
  onNavigationLeftPress?: () => void;
  onNavigationRightPress?: () => void;
  arrowLeftComponent?: React.ComponentType<{ onPress: () => void }> | null;
  arrowRightComponent?: React.ComponentType<{ onPress: () => void }> | null;
}

export type CalendarHeaderElement = React.ReactElement<CalendarHeaderProps>;

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  style,
  viewModeId,
  title,
  titleStyle,
  iconStyle,
  lateralNavigationAllowed,
  onTitlePress,
  onNavigationLeftPress,
  onNavigationRightPress,
  arrowLeftComponent: ArrowLeftComponent,
  arrowRightComponent: ArrowRightComponent,
  ...viewProps
}) => {
  const renderTitleIcon = useCallback((): ChevronDownElement => {
    const { tintColor, ...svgStyle } = iconStyle || {};
    const rotation = viewModeId === CalendarViewModes.DATE.id ? 0 : 180;

    return (
      <ChevronDown
        style={[styles.headerButtonIcon, svgStyle]}
        rotation={rotation}
        fill={tintColor}
      />
    );
  }, [iconStyle, viewModeId]);

  const renderLeftIcon = useCallback((): ChevronLeftElement => {
    const { tintColor, ...svgStyle } = iconStyle || {};
    const IconComponent: React.ComponentType<SvgProps> = RTLService.select(ChevronLeft, ChevronRight);

    return (
      <IconComponent
        style={[styles.lateralIcon, svgStyle]}
        fill={tintColor}
      />
    );
  }, [iconStyle]);

  const renderRightIcon = useCallback((): ChevronRightElement => {
    const { tintColor, ...svgStyle } = iconStyle || {};
    const IconComponent: React.ComponentType<SvgProps> = RTLService.select(ChevronRight, ChevronLeft);

    return (
      <IconComponent
        style={[styles.lateralIcon, svgStyle]}
        fill={tintColor}
      />
    );
  }, [iconStyle]);

  const renderLeftArrow = useCallback((): React.ReactElement => {
    if (ArrowLeftComponent) {
      return <ArrowLeftComponent onPress={onNavigationLeftPress} />;
    }

    return (
      <Button
        appearance='ghost'
        accessoryRight={renderLeftIcon}
        onPress={onNavigationLeftPress}
      />
    );
  }, [ArrowLeftComponent, onNavigationLeftPress, renderLeftIcon]);

  const renderRightArrow = useCallback((): React.ReactElement => {
    if (ArrowRightComponent) {
      return <ArrowRightComponent onPress={onNavigationRightPress} />;
    }

    return (
      <Button
        appearance='ghost'
        accessoryRight={renderRightIcon}
        onPress={onNavigationRightPress}
      />
    );
  }, [ArrowRightComponent, onNavigationRightPress, renderRightIcon]);

  const renderLateralNavigationControls = (): React.ReactElement<ViewProps> => {
    return (
      <View style={styles.subContainer}>
        {renderLeftArrow()}
        {renderRightArrow()}
      </View>
    );
  };

  const renderTitleElement = useCallback((props: TextProps): React.ReactElement => {
    return (
      <Text
        {...props}
        style={[props.style, styles.headerButtonText, titleStyle]}
      >
        {title}
      </Text>
    );
  }, [title, titleStyle]);

  return (
    <View
      {...viewProps}
      style={[styles.container, style]}
    >
      <Button
        appearance='ghost'
        accessoryRight={renderTitleIcon}
        onPress={onTitlePress}
      >
        {renderTitleElement}
      </Button>
      {lateralNavigationAllowed && renderLateralNavigationControls()}
    </View>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

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
});
