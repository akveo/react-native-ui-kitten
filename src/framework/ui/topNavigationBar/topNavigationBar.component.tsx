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
import { Props as ActionProps } from './topNavigationBarAction.component';

type ActionElement = React.ReactElement<ActionProps>;

interface TopNavigationBarProps {
  title?: string;
  subtitle?: string;
  leftControl?: ActionElement;
  rightControls?: ActionElement[];
}

export type Props = TopNavigationBarProps & StyledComponentProps & ViewProps;

export class TopNavigationBar extends React.Component<Props> {

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: {
        backgroundColor: style.backgroundColor,
        height: style.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        paddingHorizontal: style.paddingHorizontal,
      },
      titleContainer: style['title.centered'] ? {
        flex: 3,
        alignItems: 'center',
      } : {
        flex: 1,
        paddingHorizontal: style.paddingHorizontal,
      },
      leftControlContainer: style['title.centered'] ? {
        flex: 1,
      } : null,
      rightControlsContainer: style['title.centered'] ? {
        flex: 1,
      } : null,
      title: {
        color: style['title.color'],
        fontSize: style['title.fontSize'],
        fontWeight: style['title.fontWeight'],
      },
      subtitle: {
        color: style['subtitle.color'],
        fontSize: style['subtitle.fontSize'],
        fontWeight: style['subtitle.fontWeight'],
      },
    };
  };

  private createTextElement = (text: string, style: StyleType): React.ReactElement<TextProps> => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  private createTitleElement = (text: string, style: StyleType): React.ReactElement<TextProps> | undefined => {
    const isValid: boolean = text && text.length !== 0;

    return isValid ? this.createTextElement(text, style) : undefined;
  };

  private createRightActionElement = (element: ActionElement, index: number): ActionElement | null => {
    const isLast: boolean = React.Children.count(this.props.rightControls) - 1 === index;

    return element ? React.cloneElement(element, {
      key: index,
      isLastItem: isLast,
    }) : null;
  };

  private createRightActionElements(source: React.ReactElement<ActionProps>[]): ActionElement[] {
    return source.map(this.createRightActionElement);
  }

  public render(): React.ReactNode {
    const { style, themedStyle, title, subtitle, leftControl, rightControls, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View
        {...derivedProps}
        style={[strictStyles.container, componentStyle.container, style]}>
        <View style={[componentStyle.leftControlContainer, strictStyles.leftControlContainer]}>
          {leftControl}
        </View>
        <View style={componentStyle.titleContainer}>
          {this.createTitleElement(title, componentStyle.title)}
          {this.createTitleElement(subtitle, componentStyle.subtitle)}
        </View>
        <View style={[strictStyles.rightControlsContainer, componentStyle.rightControlsContainer]}>
          {this.createRightActionElements(rightControls)}
        </View>
      </View>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftControlContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
