import React from 'react';
import {
  View,
  Text,
  Image,
  ViewProps,
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

  render() {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View
        {...this.props}
        style={[this.props.style, componentStyle.container]}>
        <Image
          style={componentStyle.icon}
          source={this.props.icon}
        />
        <Text
          style={componentStyle.title}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
