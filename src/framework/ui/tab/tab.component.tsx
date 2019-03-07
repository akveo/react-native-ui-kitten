import React from 'react';
import {
  Text,
  TextProps,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TabProps {
  title?: string;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

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
    return {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: source.icon,
      title: source.text,
    };
  };

  private renderTextComponent = (style: StyleType): React.ReactElement<TextProps> | null => {
    return this.props.title ? (
      <Text
        style={style}
        key={1}>
        {this.props.title}
      </Text>
    ) : null;
  };

  private renderImageComponent = (style: StyleType): React.ReactElement<ImageProps> | null => {
    const icon: React.ReactElement<ImageProps> = this.props.icon && this.props.icon(style);
    return icon ? React.cloneElement(icon, { key: 2 }) : null;
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => ([
    this.renderImageComponent(style.icon),
    this.renderTextComponent(style.title),
  ]);

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles }: StyleType = this.getComponentStyle(themedStyle);

    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[style, container]}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}
