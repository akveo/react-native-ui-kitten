import React from 'react';
import {
  View,
  Image,
  Text,
  ViewProps,
  ImageProps,
  TextProps,
  ImageSourcePropType,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TabProps {
  title?: string;
  icon?: ImageSourcePropType;
}

export type Props = TabProps & StyledComponentProps & ViewProps;

export class Tab extends React.Component<Props> {

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {},
      title: {},
    };
  };

  private createTextComponent = (style: StyleType): React.ReactElement<TextProps> => (
    <Text
      style={style}
      key={1}>
      {this.props.title}
    </Text>
  );

  private createImageComponent = (style: StyleType): React.ReactElement<ImageProps> => (
    <Image
      style={style}
      key={0}
      source={this.props.icon}
    />
  );

  private createComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, title } = this.props;

    return [
      icon ? this.createImageComponent(style.icon) : undefined,
      title ? this.createTextComponent(style.title) : undefined,
    ];
  };

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const children = this.createComponentChildren(componentStyle);

    return (
      <View
        {...this.props}
        style={[this.props.style, componentStyle.container]}>
        {children}
      </View>
    );
  }
}
