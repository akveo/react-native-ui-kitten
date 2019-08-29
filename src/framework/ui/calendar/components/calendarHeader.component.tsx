import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { Text } from '../../text/text.component';
import {
  Chevron,
  ChevronElement,
  ChevronDirection,
} from '../../support/components';

interface ComponentProps extends ViewProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  lateralNavigationAllowed: boolean;
  onTitlePress?: () => void;
  onRight?: () => void;
  onLeft?: () => void;
}

export type CalendarHeaderProps = ComponentProps;
export type CalendarHeaderElement = React.ReactElement<CalendarHeaderProps>;

export class CalendarHeader extends React.Component<CalendarHeaderProps> {

  private renderTitleIcon = (style: StyleProp<ImageStyle>,
                             direction: ChevronDirection): ChevronElement => {

    return (
      <Chevron
        style={style}
        direction={direction}
      />
    );
  };

  private renderLateralNavigationControls = (): React.ReactElement<ViewProps> => {
    const { iconStyle, onLeft, onRight } = this.props;

    return (
      <View style={styles.subContainer}>
        <TouchableOpacity
          activeOpacity={0.70}
          onPress={onLeft}>
          {this.renderTitleIcon(iconStyle, 'left')}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.70}
          onPress={onRight}>
          {this.renderTitleIcon(iconStyle, 'right')}
        </TouchableOpacity>
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const {
      style,
      titleStyle,
      onTitlePress,
      title,
      iconStyle,
      lateralNavigationAllowed,
      ...restProps
    } = this.props;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <TouchableOpacity
          activeOpacity={0.70}
          style={styles.subContainer}
          onPress={onTitlePress}>
          <Text style={titleStyle}>{title}</Text>
          {this.renderTitleIcon(iconStyle, 'bottom')}
        </TouchableOpacity>
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
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
