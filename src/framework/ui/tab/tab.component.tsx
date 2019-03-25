import React from 'react';
import {
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';

interface TabProps {
  title?: string;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const Text = styled<TextProps>(TextComponent);

export type Props = TabProps & StyledComponentProps & TouchableOpacityProps;

export class Tab extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selected: false,
  };

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textColor,
      textFontWeight,
      iconWidth,
      iconHeight,
      iconTintColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
      },
      title: {
        color: textColor,
        fontWeight: textFontWeight,
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
        style={[style, container, styles.container]}
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
