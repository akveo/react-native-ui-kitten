import React from 'react';
import {
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Avatar as AvatarComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

const SIZE: string = 'large';
const SHAPE: string = 'rounded';
const SOURCE: ImageSourcePropType = { uri: 'https://randomuser.me/api/portraits/men/3.jpg' };

class Avatar extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Avatar',
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Default</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <AvatarComponent
              size={SIZE}
              source={SOURCE}
            />
            <AvatarComponent
              size={SIZE}
              source={SOURCE}
            />
            <AvatarComponent
              size={SIZE}
              source={SOURCE}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Custom</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <AvatarComponent
              style={this.props.themedStyle.component}
              size={SIZE}
              shape={SHAPE}
              source={SOURCE}
            />
            <AvatarComponent
              style={this.props.themedStyle.component}
              size={SIZE}
              shape={SHAPE}
              source={SOURCE}
            />
            <AvatarComponent
              style={this.props.themedStyle.component}
              size={SIZE}
              shape={SHAPE}
              source={SOURCE}
            />
          </View>
        </View>
      </View>
    );
  }
}

export const AvatarScreen = withStyles(Avatar, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSection: {
    marginVertical: 16,
  },
  containerPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDescription: {
    fontSize: 18,
  },
  component: {
    backgroundColor: 'gray',
    width: 80,
    height: 80,
  },
}));
