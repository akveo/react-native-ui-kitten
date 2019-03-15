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
    const { textAlign, ...restStyles } = style;
    const isCentered: boolean = textAlign === 'center';

    return {
      container: {
        height: restStyles.height,
        paddingTop: restStyles.paddingTop,
        paddingBottom: restStyles.paddingBottom,
        paddingHorizontal: restStyles.paddingHorizontal,
        backgroundColor: restStyles.backgroundColor,
      },
      titleContainer: isCentered ? {
        flex: 3,
        alignItems: 'center',
      } : {
        flex: 1,
        paddingHorizontal: restStyles.paddingHorizontal,
      },
      leftControlContainer: isCentered ? {
        flex: 1,
      } : null,
      rightControlsContainer: isCentered ? {
        flex: 1,
      } : null,
      title: {
        color: restStyles.titleColor,
        fontSize: restStyles.titleFontSize,
        fontWeight: restStyles.titleFontWeight,
      },
      subtitle: {
        color: restStyles.subtitleColor,
        fontSize: restStyles.subtitleFontSize,
        fontWeight: restStyles.subtitleFontWeight,
      },
    };
  };

  private createTextElement = (text: string, style: StyleType): React.ReactElement<TextProps> => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  private renderTitleElement = (text: string, style: StyleType): React.ReactElement<TextProps> | undefined => {
    const isValid: boolean = text && text.length !== 0;

    return isValid ? this.createTextElement(text, style) : undefined;
  };

  private renderRightActionElement = (element: ActionElement, index: number): ActionElement | null => {
    const isLast: boolean = React.Children.count(this.props.rightControls) - 1 === index;

    return element ? React.cloneElement(element, {
      key: index,
      isLastItem: isLast,
    }) : null;
  };

  private renderRightActionElements(source: React.ReactElement<ActionProps>[]): ActionElement[] {
    return source.map(this.renderRightActionElement);
  }

  public render(): React.ReactNode {
    const { style, themedStyle, title, subtitle, leftControl, rightControls, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View
        {...restProps}
        style={[styles.container, componentStyle.container, style]}>
        <View style={[componentStyle.leftControlContainer, styles.leftControlContainer]}>
          {leftControl}
        </View>
        <View style={componentStyle.titleContainer}>
          {this.renderTitleElement(title, componentStyle.title)}
          {this.renderTitleElement(subtitle, componentStyle.subtitle)}
        </View>
        <View style={[styles.rightControlsContainer, componentStyle.rightControlsContainer]}>
          {this.renderRightActionElements(rightControls)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
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
