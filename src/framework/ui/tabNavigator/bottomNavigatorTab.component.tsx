import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextProps,
  ImageProps,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface BottomNavigatorTabProps {
  title?: string;
  icon?: (width: number, height: number, color: string) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type Props = BottomNavigatorTabProps & StyledComponentProps & TouchableOpacityProps;

export class BottomNavigatorTab extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: {},
      icon: source.icon,
      title: source.text,
    };
  };

  private renderImageElement(style: StyleType): React.ReactElement<ImageProps> | null {
    const icon: React.ReactElement<ImageProps> = this.props.icon ?
      this.props.icon(style.width, style.height, style.color) : null;
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

  private createComponentChildren = (style: StyleType): React.ReactNode => ([
    this.renderImageElement(style.icon),
    this.renderTextElement(style.title),
  ]);

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.createComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[style, container, strictStyles.container]}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const strictStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
