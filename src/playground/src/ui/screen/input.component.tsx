import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ViewProps,
  TouchableWithoutFeedbackProps,
  ImageProps,
  Image,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import { Input } from '@kitten/ui';

const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
const PLACEHOLDER: string = 'Placeholder';

interface AvoidKeyboardProps {
  children: React.ReactNode;
}

const AvoidKeyboard = (props?: ViewProps & AvoidKeyboardProps): React.ReactElement<TouchableWithoutFeedbackProps> => {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}>
      <View {...props}/>
    </TouchableWithoutFeedback>
  );
};

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  input: string;
}

class InputScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Input',
  };

  public state: State = {
    input: '',
  };

  private onInputChange = (input: string) => {
    this.setState({ input });
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
    return (
      <AvoidKeyboard style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Input
              style={this.props.themedStyle.component}
              onChangeText={this.onInputChange}
              value={this.state.input}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Disabled</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Input
              style={this.props.themedStyle.component}
              disabled={true}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Status</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Input
              status='success'
              style={this.props.themedStyle.component}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
            <Input
              status='info'
              style={this.props.themedStyle.component}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
            <Input
              status='warning'
              style={this.props.themedStyle.component}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
            <Input
              status='danger'
              style={this.props.themedStyle.component}
              icon={this.renderIcon}
              placeholder={PLACEHOLDER}
            />
          </View>
        </View>
      </AvoidKeyboard>
    );
  }
}

export default withStyles(InputScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSection: {
    marginVertical: 16,
  },
  containerPreview: {
    alignItems: 'center',
    marginTop: 4,
  },
  textDescription: {
    fontSize: 18,
  },
  component: {
    marginVertical: 4,
  },
}));
