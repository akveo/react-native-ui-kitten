import React from 'react';
import {
  ImageProps,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
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
import { TextStyleProps } from '@kitten/ui/common/props';

const Text = styled<TextProps>(TextComponent);

type IconElement = React.ReactElement<ImageProps>;
type LabelElement = React.ReactElement<TextProps>;

interface CaptionStyles {
  container: StyleType;
  text: StyleType;
  icon: StyleType;
}

interface InputProps {
  status?: string;
  disabled?: boolean;
  label?: string;
  caption?: string;
  captionIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
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
    const { rest: derivedContainerStyle, ...derivedTextStyle } = allWithRest(derivedStyle, TextStyleProps);

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
        ...derivedContainerStyle,
        ...styles.container,
      },
      inputContainer: {
        ...containerParameters,
        ...styles.inputContainer,
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
      caption: {
        text: {
          color: captionTextColor,
          fontSize: captionTextFontSize,
          fontWeight: captionTextFontWeight,
          lineHeight: captionTextLineHeight,
        },
        icon: {
          width: captionIconWidth,
          height: captionIconHeight,
          tintColor: captionIconTintColor,
          marginRight: captionIconMarginRight,
        },
        container: {
          marginTop: captionMarginTop,
          ...styles.captionContainer,
        },
      },
    };
  };

  private renderIconElement = (style: StyleType,
                               icon: (style: StyleType) => IconElement): IconElement | null => {

    return icon ? icon(style) : null;
  };

  private renderTextElement = (style: StyleType, text: string): LabelElement => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  private renderText = (style: StyleType, text: string): LabelElement | null => {
    const hasText: boolean = text && text.length !== 0;

    return hasText ? this.renderTextElement(style, text) : null;
  };

  private renderCaptionElement = (style: CaptionStyles): React.ReactElement<ViewProps> | null => {
    const { caption, captionIcon } = this.props;
    const icon: IconElement | null = this.renderIconElement(style.icon, captionIcon);
    const text: LabelElement | null = this.renderText(style.text, caption);

    return (
      <View style={style.container}>
        {icon}
        {text}
      </View>
    );
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, disabled, label, icon, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const inputIcon: IconElement | null = this.renderIconElement(componentStyle.icon, icon);
    const inputLabel: LabelElement | null = this.renderText(componentStyle.label, label);
    const caption: React.ReactElement<ViewProps> | null =
      this.renderCaptionElement(componentStyle.caption);

    return (
      <View style={componentStyle.container}>
        {inputLabel}
        <View style={componentStyle.inputContainer}>
          <TextInput
            {...restProps}
            editable={!disabled}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
            style={componentStyle.text}
          />
          {inputIcon}
        </View>
        {caption}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  icon: {},
  label: {},
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
