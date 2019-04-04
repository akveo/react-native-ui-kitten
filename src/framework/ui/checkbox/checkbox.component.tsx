import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
  allWithRest,
} from '@kitten/theme';
import {
  Props as TextProps,
  Text as TextComponent,
} from '../text/text.component';
import { CheckMark } from '../drawable';
import { TextStyleProps } from '../common/props';

interface CheckBoxProps {
  style?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  indeterminate?: boolean;
  status?: string;
  size?: string;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
}

const Text = styled<TextProps>(TextComponent);

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

  private onPress = () => {
    this.props.dispatch([]);

    if (this.props.onChange) {
      this.props.onChange(!this.props.checked, false);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const derivedStyle: TextStyle = StyleSheet.flatten(this.props.style);
    const { rest: derivedContainerStyle, ...derivedTextStyle } = allWithRest(derivedStyle, TextStyleProps);

    const {
      textMarginHorizontal,
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      iconWidth,
      iconHeight,
      iconBorderRadius,
      iconTintColor,
      highlightWidth,
      highlightHeight,
      highlightBorderRadius,
      highlightBackgroundColor,
      ...containerParameters
    } = style;

    return {
      container: {
        ...derivedContainerStyle,
        ...styles.container,
      },
      highlightContainer: styles.highlightContainer,
      selectContainer: {
        ...containerParameters,
        ...styles.selectContainer,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        ...styles.text,
        ...derivedTextStyle,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        borderRadius: iconBorderRadius,
        backgroundColor: iconTintColor,
      },
      highlight: {
        width: highlightWidth,
        height: highlightHeight,
        borderRadius: highlightBorderRadius,
        backgroundColor: highlightBackgroundColor,
        ...styles.highlight,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text style={style}>{text}</Text>
    );
  };

  private renderSelectIconElement = (style: StyleType): React.ReactElement<ViewProps> => {
    return (
      <CheckMark style={[style, styles.selectIcon]}/>
    );
  };

  private renderIndeterminateIconElement = (style: StyleType): React.ReactElement<ViewProps> => {
    return (
      <View style={[style, styles.indeterminateIcon]}/>
    );
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ViewProps> => {
    if (this.props.indeterminate) {
      return this.renderIndeterminateIconElement(style);
    } else {
      return this.renderSelectIconElement(style);
    }
  };

  private renderComponentChildren = (style: StyleType): React.ReactElement<ViewProps>[] => {
    const { text } = this.props;

    return [
      this.renderIconElement(style.icon),
      text ? this.renderTextElement(style.text) : null,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, text, ...derivedProps } = this.props;

    const {
      container,
      highlightContainer,
      highlight,
      selectContainer,
      ...componentStyle
    }: StyleType = this.getComponentStyle(themedStyle);

    const [iconElement, textElement] = this.renderComponentChildren(componentStyle);

    return (
      <View style={container}>
        <View style={highlightContainer}>
          <View style={highlight}/>
          <TouchableOpacity
            {...derivedProps}
            style={selectContainer}
            activeOpacity={1.0}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            {iconElement}
          </TouchableOpacity>
        </View>
        {textElement}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectIcon: {},
  indeterminateIcon: {
    borderRadius: 6,
  },
  highlight: {
    position: 'absolute',
  },
  text: {},
});
