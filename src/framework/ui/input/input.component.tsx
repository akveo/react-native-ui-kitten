import React from 'react';
import {
  ImageProps,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {
  Interaction,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  InputFocusEvent,
  InputEndEditEvent,
} from '../common/type';

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
    const {
      textMarginHorizontal,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      ...containerParameters
    } = style;

    return {
      container: containerParameters,
      text: {
        marginHorizontal: textMarginHorizontal,
        color: textColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
    };
  };

  private getDerivedStyle = (style: StyleType): StyleType => {
    const {
      color,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      textAlign,
      ...container
    } = style;

    return {
      container: container,
      text: {
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        letterSpacing,
        textAlign,
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
    const { style, themedStyle, disabled, ...derivedProps } = this.props;

    const derivedStyle: StyleType = this.getDerivedStyle(style);
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyle.icon);

    return (
      <View style={[componentStyle.container, derivedStyle.container, strictStyles.container]}>
        <TextInput
          {...derivedProps}
          editable={!disabled}
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          style={[componentStyle.text, derivedStyle.text, strictStyles.text]}
        />
        {componentChildren}
      </View>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  icon: {
    flexGrow: 1,
  },
});
