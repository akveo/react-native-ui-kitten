import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageProps,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
  StyleType,
} from '@kitten/theme';
import { Tooltip } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const PLACEMENT: string = 'bottom';
const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

interface State {
  startVisible: boolean;
  centerVisible: boolean;
  endVisible: boolean;
  withIconVisible: boolean;
}

class TooltipScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Tooltip',
  };

  public state: State = {
    startVisible: false,
    centerVisible: false,
    endVisible: false,
    withIconVisible: false,
  };

  private onStartPress = () => {
    this.setState({
      startVisible: !this.state.startVisible,
    });
  };

  private onCenterPress = () => {
    this.setState({
      centerVisible: !this.state.centerVisible,
    });
  };

  private onEndPress = () => {
    this.setState({
      endVisible: !this.state.endVisible,
    });
  };

  private onWithIconPress = () => {
    this.setState({
      withIconVisible: !this.state.withIconVisible,
    });
  };

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    return (
      <Image
        style={style}
        source={ICON}
      />
    );
  };

  public render(): React.ReactNode {
    const { container, componentContainer, component, tip, text } = this.props.themedStyle;

    return (
      <View style={container}>
        <View style={componentContainer}>
          <Tooltip
            style={component}
            placement={`${PLACEMENT} start`}
            visible={this.state.startVisible}
            text='Place your text here️'
            onRequestClose={this.onStartPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onStartPress}>
              <Text style={text}>{`${PLACEMENT} start`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View style={componentContainer}>
          <Tooltip
            style={component}
            placement={`${PLACEMENT}`}
            visible={this.state.centerVisible}
            text='Place your text here'
            onRequestClose={this.onCenterPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onCenterPress}>
              <Text style={text}>{`${PLACEMENT}`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View style={componentContainer}>
          <Tooltip
            style={component}
            placement={`${PLACEMENT} end`}
            visible={this.state.endVisible}
            text='Place your text here'
            onRequestClose={this.onEndPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onEndPress}>
              <Text style={text}>{`${PLACEMENT} end`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View style={componentContainer}>
          <Tooltip
            style={component}
            visible={this.state.withIconVisible}
            text='Place your text here'
            icon={this.renderIcon}
            onRequestClose={this.onWithIconPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onWithIconPress}>
              <Text style={text}>WITH ICON</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
      </View>
    );
  }
}

export default withStyles(TooltipScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentContainer: {
    margin: 32,
  },
  component: {
    // tooltip customization place
  },
  tip: {
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 2,
    minWidth: 256,
    minHeight: 64,
    borderColor: 'black',
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '800',
  },
}));
