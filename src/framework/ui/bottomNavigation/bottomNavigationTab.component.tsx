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
    return {
      icon: {
        width: source.iconWidth,
        height: source.iconHeight,
        marginBottom: source.iconMarginBottom,
        tintColor: source.iconTintColor,
      },
      title: {
        color: source.textColor,
        fontWeight: source.textFontWeight,
      },
    };
  };

  private renderImageElement(style: StyleType): React.ReactElement<ImageProps> | null {
    const icon: React.ReactElement<ImageProps> = this.props.icon ?
      this.props.icon(style) : null;
    return icon ? React.cloneElement(icon, {
      style: {
        ...(icon.props.style as object),
        marginBottom: style.source,
      },
      key: 1,
    }) : null;
  }

  private renderTextElement(style: StyleType): React.ReactElement<TextProps> | null {
    const { title } = this.props;
    return title && title.length !== 0 ? (
      <Text
        key={2}
        style={style}>
        {this.props.title}
      </Text>
    ) : null;
  }

  private renderComponentChildren = (style: StyleType): React.ReactNode => ([
    this.renderImageElement(style.icon),
    this.renderTextElement(style.title),
  ]);

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const componentStyles: StyleType = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[style, styles.container]}
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
});
