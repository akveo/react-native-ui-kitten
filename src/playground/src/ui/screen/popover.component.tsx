import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';
import { Popover } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const PLACEMENT: string = 'top';

interface State {
  startVisible: boolean;
  centerVisible: boolean;
  endVisible: boolean;
}

class PopoverScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Popover',
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

  private createPopoverContentElement = (text?: string): React.ReactElement<TextProps> => {
    const { text: textStyle } = this.props.themedStyle;

    return (
      <Text style={textStyle}>{text}</Text>
    );
  };

  public render(): React.ReactNode {
    const { container, componentContainer, component, tip, text } = this.props.themedStyle;

    return (
      <View style={container}>
        <View style={componentContainer}>
          <Popover
            style={component}
            placement={`${PLACEMENT} start`}
            visible={this.state.startVisible}
            content={this.createPopoverContentElement('❤️')}
            onRequestClose={this.onStartPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onStartPress}>
              <Text style={text}>{`${PLACEMENT} start`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Popover>
        </View>
        <View style={componentContainer}>
          <Popover
            style={component}
            placement={`${PLACEMENT}`}
            visible={this.state.centerVisible}
            content={this.createPopoverContentElement('💛️')}
            onRequestClose={this.onCenterPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onCenterPress}>
              <Text style={text}>{`${PLACEMENT}`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Popover>
        </View>
        <View style={componentContainer}>
          <Popover
            style={component}
            placement={`${PLACEMENT} end`}
            visible={this.state.endVisible}
            content={this.createPopoverContentElement('💚')}
            onRequestClose={this.onEndPress}>
            <TouchableOpacity
              style={tip}
              onPress={this.onEndPress}>
              <Text style={text}>{`${PLACEMENT} end`.toUpperCase()}</Text>
            </TouchableOpacity>
          </Popover>
        </View>
      </View>
    );
  }
}

export default withStyles(PopoverScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  componentContainer: {
    margin: 32,
  },
  component: {
    // popover customization place
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



