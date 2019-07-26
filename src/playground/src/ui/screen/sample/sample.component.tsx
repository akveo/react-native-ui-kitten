import React from 'react';
import {
  ImageProps,
  ImageSourcePropType,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  Input,
  Layout,
  LayoutElement,
  Text,
  Toggle,
} from '@kitten/ui';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';

interface ComponentProps {
  profileImage: ImageSourcePropType;
  isDark: () => boolean;
  setTheme: (dark: boolean) => void;
}

interface State {
  passwordVisible: boolean;
}

type SampleComponentProps = ComponentProps & ThemedComponentProps;

class SampleComponent extends React.Component<SampleComponentProps, State> {

  public state: State = {
    passwordVisible: false,
  };

  private onPasswordIconPress = () => {
    const passwordVisible: boolean = !this.state.passwordVisible;
    this.setState({ passwordVisible });
  };

  private renderPasswordIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const icon: string = this.state.passwordVisible ? 'eye' : 'eye-off';

    return (
      <Icon name={icon} {...style}/>
    );
  };

  public render(): LayoutElement {
    const { themedStyle, profileImage, isDark, setTheme } = this.props;

    return (
      <Layout
        style={themedStyle.container}
        level='4'>
        <Layout style={themedStyle.cardContainer}>
          <Layout
            style={themedStyle.cardHeader}
            level='3'>
            <View style={themedStyle.themeToggleContainer}>
              <Text
                style={themedStyle.themeText}
                category='s2'>
                Dark Mode
              </Text>
              <Toggle
                size='small'
                checked={isDark()}
                onChange={setTheme}
              />
            </View>
            <Avatar
              style={themedStyle.profileImage}
              source={profileImage}
            />
            <View style={themedStyle.welcomeContainer}>
              <Text category='h4'>Welcome</Text>
              <Text category='s1'>Sign in to your account</Text>
            </View>
          </Layout>
          <Layout
            style={themedStyle.formContainer}
            level='1'>
            <Input
              style={themedStyle.formInput}
              label='Email'
              placeholder='contact@akveo.com'
            />
            <Input
              style={themedStyle.formInput}
              secureTextEntry={!this.state.passwordVisible}
              label='Password'
              placeholder='********'
              icon={this.renderPasswordIcon}
              onIconPress={this.onPasswordIconPress}
            />
          </Layout>
          <Button style={themedStyle.signInButton}>SIGN IN</Button>
        </Layout>
      </Layout>
    );
  }
}

export const Sample = withStyles(SampleComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 192,
    paddingHorizontal: 24,
  },
  themeToggleContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    marginHorizontal: 8,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderWidth: 4,
    borderColor: theme['border-basic-color-4'],
  },
  welcomeContainer: {
    paddingHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  formInput: {
    marginVertical: 4,
  },
  signInButton: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
}));

