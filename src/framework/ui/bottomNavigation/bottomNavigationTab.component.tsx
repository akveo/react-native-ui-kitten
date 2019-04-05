import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageProps,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface BottomNavigatorTabProps {
  title?: string;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type Props = BottomNavigatorTabProps & StyledComponentProps & TouchableOpacityProps;

export class BottomNavigationTab extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      textMarginVertical,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      ...containerStyle
    } = source;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      text: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...styles.text,
      },
    };
  };

  private renderImageElement(style: StyleType): React.ReactElement<ImageProps> {
    const icon: React.ReactElement<ImageProps> = this.props.icon(style);

    return React.cloneElement(icon, { key: 1 });
  }

  private renderTextElement(style: StyleType): React.ReactElement<TextProps> {
    const { title } = this.props;

    return (
      <Text
        key={2}
        style={style}>
        {title}
      </Text>
    );
  }

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, title } = this.props;

    return [
      icon ? this.renderImageElement(style.icon) : null,
      title ? this.renderTextElement(style.text) : null,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={container}
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
  text: {},
});
