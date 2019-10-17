import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import { Button } from '../../button/button.component';
import {
  Chevron,
  ChevronElement,
  ChevronDirection,
} from '../../support/components';

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

  private renderSpecificTitleIcon = (style: StyleProp<ImageStyle>, direction: ChevronDirection): ChevronElement => {
    return (
      <Chevron
        style={style}
        direction={direction}
      />
    );
  };

  private renderTitleIcon = (style: ImageStyle): ChevronElement => {
    const { iconStyle } = this.props;

    return this.renderSpecificTitleIcon(iconStyle, 'bottom');
  };

  private renderLeftIcon = (style: ImageStyle): ChevronElement => {
    const { iconStyle } = this.props;

    return this.renderSpecificTitleIcon([iconStyle, styles.lateralIcon], 'left');
  };

  private renderRightIcon = (style: ImageStyle): ChevronElement => {
    const { iconStyle } = this.props;

    return this.renderSpecificTitleIcon([iconStyle, styles.lateralIcon], 'right');
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
    paddingVertical: 0,
    paddingHorizontal: 0,
    minWidth: 24,
    minHeight: 24,
  },
  headerButtonText: {
    marginHorizontal: 0,
  },
  lateralIcon: {
    marginHorizontal: 0,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
