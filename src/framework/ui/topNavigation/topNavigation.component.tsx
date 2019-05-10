import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TopNavigationActionProps } from './topNavigationAction.component';
import {
  TopNavigationAlignment,
  TopNavigationAlignments,
} from './type';

type TextElement = React.ReactElement<TextProps>;
type ActionElement = React.ReactElement<TopNavigationActionProps>;
type ActionElementProp = ActionElement | ActionElement[];

interface ComponentProps {
  title?: React.ReactText;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: React.ReactText;
  subtitleStyle?: StyleProp<TextStyle>;
  alignment?: string | TopNavigationAlignment;
  leftControl?: ActionElement;
  rightControls?: ActionElementProp;
}

export type TopNavigationProps = StyledComponentProps & ViewProps & ComponentProps;

export class TopNavigation extends React.Component<TopNavigationProps> {

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

  private renderTextElement = (text: React.ReactText, style: StyleType): TextElement => {
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
      title && this.renderTextElement(title, style.title),
      subtitle && this.renderTextElement(title, style.subtitle),
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
        {...restProps}
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
