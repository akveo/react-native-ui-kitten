import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TextProps,
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
  subtitle?: string;
  alignment?: string | TopNavigationAlignment;
  leftControl?: ActionElement;
  rightControls?: ActionElement[];
}

export type Props = TopNavigationProps & StyledComponentProps & ViewProps;

export class TopNavigation extends React.Component<Props> {

  private getComponentStyle = (style: StyleType): StyleType => {
    const { alignment: alignmentValue, leftControl, rightControls } = this.props;

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
        ...styles.title,
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
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
