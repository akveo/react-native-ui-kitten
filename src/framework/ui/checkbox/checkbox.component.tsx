import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
  styled,
  allWithRest,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import { CheckMark } from '../drawable/checkmark/checkmark.component';
import { TextStyleProps } from '../common/props';

interface CheckBoxProps {
  style?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (checked: boolean) => void;
}

const Text = styled<TextProps>(TextComponent);

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
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
      textColor,
      textFontSize,
      textFontWeight,
      textMarginLeft,
      selectWidth,
      selectHeight,
      selectBackgroundColor,
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
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        marginLeft: textMarginLeft,
        ...derivedTextStyle,
        ...styles.text,
      },
      select: {
        width: selectWidth,
        height: selectHeight,
        backgroundColor: selectBackgroundColor,
        ...styles.select,
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
      <Text style={style} key={0}>{text}</Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { text } = this.props;

    return [
      text ? this.renderTextElement(style) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyle.text);

    return (
      <View style={componentStyle.container}>
        <View style={componentStyle.highlightContainer}>
          <View style={componentStyle.highlight}/>
          <TouchableOpacity
            {...derivedProps}
            style={componentStyle.selectContainer}
            activeOpacity={1.0}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            <CheckMark style={componentStyle.select}/>
          </TouchableOpacity>
        </View>
        {componentChildren}
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
  select: {},
  highlight: {
    position: 'absolute',
  },
  text: {},
});
