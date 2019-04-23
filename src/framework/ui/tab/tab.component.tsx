import React from 'react';
import {
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  allWithRest,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import { TextStyleProps } from '../common/props';

interface TabProps {
  style?: StyleProp<TextStyle>;
  title?: string;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  children?: React.ReactElement<any>;
}

const Text = styled<TextProps>(TextComponent);

export type Props = TabProps & StyledComponentProps & TouchableOpacityProps;

export class Tab extends React.Component<Props> {

  static styledComponentName: string = 'Tab';

  static defaultProps: Partial<Props> = {
    selected: false,
  };

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const derivedStyle: TextStyle = StyleSheet.flatten(this.props.style);
    const { rest: derivedContainerStyle, ...derivedTextStyle } = allWithRest(derivedStyle, TextStyleProps);

    const {
      textMarginVertical,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...derivedContainerStyle,
        ...styles.container,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      title: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...derivedTextStyle,
        ...styles.title,
      },
    };
  };

  private renderTextComponent = (style: StyleType): React.ReactElement<TextProps> => {
    const { title: text } = this.props;

    return (
      <Text
        style={style}
        key={1}>
        {text}
      </Text>
    );
  };

  private renderImageComponent = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(style);

    return React.cloneElement(iconElement, { key: 2 });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { title, icon } = this.props;

    return [
      icon ? this.renderImageComponent(style.icon) : undefined,
      title ? this.renderTextComponent(style.title) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles }: StyleType = this.getComponentStyle(themedStyle);

    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[container, style]}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  title: {},
});
