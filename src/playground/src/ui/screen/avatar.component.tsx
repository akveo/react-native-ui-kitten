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
import { Avatar } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

const SOURCE: ImageSourcePropType = { uri: 'https://randomuser.me/api/portraits/men/3.jpg' };

class AvatarScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Avatar',
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Default</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <Avatar
              style={this.props.themedStyle.component}
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              source={SOURCE}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <Avatar
              style={this.props.themedStyle.component}
              size='giant'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              size='large'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              size='medium'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              size='small'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              size='tiny'
              source={SOURCE}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Shape</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <Avatar
              style={this.props.themedStyle.component}
              shape='square'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              shape='rounded'
              source={SOURCE}
            />
            <Avatar
              style={this.props.themedStyle.component}
              shape='rounded'
              source={SOURCE}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Custom</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <Avatar
              style={this.props.themedStyle.customComponent}
              source={SOURCE}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(AvatarScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-color-default-1'],
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
    marginHorizontal: 4,
  },
  customComponent: {
    width: 80,
    height: 80,
  },
}));
