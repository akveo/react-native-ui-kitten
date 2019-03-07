import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';
import { Tooltip as TooltipComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const PLACEMENT: string = 'bottom';

interface State {
  startVisible: boolean;
  centerVisible: boolean;
  endVisible: boolean;
}

class Tooltip extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Tooltip',
  };

  public state: State = {
    startVisible: false,
    centerVisible: false,
    endVisible: false,
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

  public render(): React.ReactNode {
    const { container, componentContainer, component, tip, text } = this.props.themedStyle;

    return (
      <View style={container}>
        <View style={componentContainer}>
          <TooltipComponent
            style={component}
            placement={`${PLACEMENT} start`}
            visible={this.state.startVisible}
            text='❤️'
            onRequestClose={this.onStartPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onStartPress}>
              <Text style={text}>{`${PLACEMENT} start`.toUpperCase()}</Text>
            </TouchableOpacity>
          </TooltipComponent>
        </View>
        <View style={componentContainer}>
          <TooltipComponent
            style={component}
            placement={`${PLACEMENT}`}
            visible={this.state.centerVisible}
            text='💛️'
            onRequestClose={this.onCenterPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onCenterPress}>
              <Text style={text}>{`${PLACEMENT}`.toUpperCase()}</Text>
            </TouchableOpacity>
          </TooltipComponent>
        </View>
        <View style={componentContainer}>
          <TooltipComponent
            style={component}
            placement={`${PLACEMENT} end`}
            visible={this.state.endVisible}
            text='💚'
            onRequestClose={this.onEndPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onEndPress}>
              <Text style={text}>{`${PLACEMENT} end`.toUpperCase()}</Text>
            </TouchableOpacity>
          </TooltipComponent>
        </View>
      </View>
    );
  }
}

export const TooltipScreen = withStyles(Tooltip, (theme: ThemeType) => ({
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
