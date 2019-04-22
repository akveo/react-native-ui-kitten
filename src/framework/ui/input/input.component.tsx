import React from 'react';
import {
  ImageProps,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {
  allWithRest,
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  InputFocusEvent,
  InputEndEditEvent,
} from '../common/type';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import {
  TextStyleProps,
  FlexStyleProps,
} from '../common/props';

const Text = styled<TextProps>(TextComponent);

type IconElement = React.ReactElement<ImageProps>;
type TextElement = React.ReactElement<TextProps>;
type IconProp = (style: StyleType) => React.ReactElement<ImageProps>;

interface InputProps {
  status?: string;
  disabled?: boolean;
  label?: string;
  caption?: string;
  captionIcon?: IconProp;
  icon?: IconProp;
}

export type Props = InputProps & StyledComponentProps & TextInputProps;

export class Input extends React.Component<Props> {

  private onFocus = (event: InputFocusEvent) => {
    this.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onEndEditing = (event: InputEndEditEvent) => {
    this.props.dispatch([]);

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const derivedStyle: TextStyle = StyleSheet.flatten(this.props.style);
    const { rest: containerStyle, ...derivedTextStyle } = allWithRest(derivedStyle, TextStyleProps);
    const { rest: inputContainerStyle, ...derivedContainerStyle } = allWithRest(containerStyle, FlexStyleProps);

    const {
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelLineHeight,
      labelMarginBottom,
      labelFontWeight,
      captionMarginTop,
      captionTextColor,
      captionTextFontSize,
      captionTextLineHeight,
      captionTextFontWeight,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      ...containerParameters
    } = style;

    return {
      container: {
        ...styles.container,
        ...derivedContainerStyle,
      },
      inputContainer: {
        ...containerParameters,
        ...styles.inputContainer,
        ...inputContainerStyle,
      },
      captionContainer: {
        marginTop: captionMarginTop,
        ...styles.captionContainer,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        color: textColor,
        ...derivedTextStyle,
        ...styles.text,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
        ...styles.label,
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
        ...styles.captionIcon,
      },
      captionLabel: {
        fontSize: captionTextFontSize,
        fontWeight: captionTextFontWeight,
        lineHeight: captionTextLineHeight,
        color: captionTextColor,
        ...styles.captionLabel,
      },
    };
  };

  private renderIconElement = (style: StyleType, icon: IconProp): IconElement => {
    return icon(style);
  };

  private renderTextElement = (style: StyleType, text: string): TextElement => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, disabled, label, icon, caption, captionIcon, ...restProps } = this.props;
    const style: StyleType = this.getComponentStyle(themedStyle);

    const iconElement: IconElement = icon ? this.renderIconElement(style.icon, icon) : null;
    const labelElement: TextElement = label ? this.renderTextElement(style.label, label) : null;
    const captionIconElement: IconElement = captionIcon ? this.renderIconElement(style.captionIcon, captionIcon) : null;
    const captionLabelElement: TextElement = caption ? this.renderTextElement(style.captionLabel, caption) : null;

    return (
      <View style={style.container}>
        {labelElement}
        <View style={style.inputContainer}>
          <TextInput
            {...restProps}
            style={style.text}
            editable={!disabled}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
          />
          {iconElement}
        </View>
        <View style={style.captionContainer}>
          {captionIconElement}
          {captionLabelElement}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  icon: {},
  label: {},
  captionIcon: {},
  captionLabel: {},
});
