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
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  InputFocusEvent,
  InputEndEditEvent,
} from '../common/type';
import { TextStyleProps } from '@kitten/ui/common/props';

interface InputProps {
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  status?: string;
  disabled?: boolean;
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
      ...containerParameters
    } = style;

    return {
      container: {
        ...containerParameters,
        ...derivedContainerStyle,
        ...styles.container,
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
    };
  };

  private renderImageElement = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    return React.cloneElement(icon(style), { key: 0 });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon } = this.props;

    const hasIcon: boolean = icon !== undefined;

    return [
      hasIcon ? this.renderImageElement(style) : undefined,
    ];
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, disabled, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyle.icon);

    return (
      <View style={componentStyle.container}>
        <TextInput
          {...derivedProps}
          editable={!disabled}
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          style={componentStyle.text}
        />
        {componentChildren}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  icon: {
  },
});
