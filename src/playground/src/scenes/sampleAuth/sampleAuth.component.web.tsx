import React from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Button,
  CheckBox,
  Icon,
  IconElement,
  Input,
  Layout,
  Select,
  SelectOption,
  SelectOptionType,
  StyleType,
  Text,
  ThemeType,
  Toggle,
  withStyles,
} from '@ui-kitten/components';
import { Toolbar } from '@pg/components/toolbar.component';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '@pg/themes/themeContext';
import { SampleAuthData } from './type';

const data: SampleAuthData = SampleAuthData.mocked();

export const SampleAuthComponent = ({ navigation, ...props }): React.ReactElement => {

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [selectedRole, setSelectedRole] = React.useState<SelectOption>(null);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const onThemeToggleChange = (checked: boolean): void => {
    const nextTheme: AppTheme = checked ? AppTheme.dark : AppTheme.light;
    themeContext.setTheme(nextTheme);
  };

  const createRoleOption = (role: string): SelectOptionType => {
    return { text: role };
  };

  const renderPasswordIcon = (style: StyleType): IconElement => (
    <Icon {...style} name={passwordVisible ? 'eye' : 'eye-off'}/>
  );

  return (
    <Layout
      style={props.themedStyle.container}
      level='4'>
      <Toolbar
        title='Auth'
        onBackPress={() => navigation.goBack()}
      />
      <Layout style={props.themedStyle.cardContainer}>
        <Layout
          style={props.themedStyle.cardHeader}
          level='3'>
          <View style={props.themedStyle.themeToggleContainer}>
            <Text
              style={props.themedStyle.themeText}
              category='s2'>
              Dark Mode
            </Text>
            <Toggle
              size='small'
              checked={themeContext.isDarkMode()}
              onChange={onThemeToggleChange}
            />
          </View>
          <Avatar
            style={props.themedStyle.profileImage}
            source={require('../../assets/images/brand-logo.png')}
          />
          <View style={props.themedStyle.welcomeContainer}>
            <Text category='h4'>Welcome</Text>
            <Text category='s1'>Sign in to your account</Text>
          </View>
        </Layout>
        <Layout
          style={props.themedStyle.formContainer}
          level='1'>
          <Input
            style={props.themedStyle.formInput}
            textStyle={props.themedStyle.formInputBox}
            label='Email'
            placeholder='contact@akveo.com'
          />
          <Input
            style={props.themedStyle.formInput}
            textStyle={props.themedStyle.formInputBox}
            secureTextEntry={!passwordVisible}
            label='Password'
            placeholder='********'
            icon={renderPasswordIcon}
            onIconPress={onPasswordIconPress}
          />
          <Select
            style={props.themedStyle.formInput}
            label='Role'
            placeholder='Role on project'
            data={data.roles.map(createRoleOption)}
            selectedOption={selectedRole}
            onSelect={setSelectedRole}
          />
          <View style={props.themedStyle.forgotPasswordContainer}>
            <CheckBox
              checked={shouldRemember}
              onChange={setShouldRemember}
              text='I agree to T&C'
            />
            <Button
              style={props.themedStyle.forgotPasswordButton}
              appearance='ghost'
              status='basic'>
              Forgot password?
            </Button>
          </View>
          <Button
            style={props.themedStyle.signupButton}
            appearance='ghost'
            status='basic'>
            No account yet?
          </Button>
          <Button style={props.themedStyle.signInButton}>SIGN IN</Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export const SampleAuthScreen = withStyles(SampleAuthComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    marginHorizontal: 24,
    marginVertical: 24,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    paddingHorizontal: 24,
  },
  themeToggleContainer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
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
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  formInput: {
    marginVertical: 4,
  },
  formInputBox: {
    outlineWidth: 0,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signupButton: {
    marginVertical: 32,
  },
  signInButton: {
    marginVertical: 16,
  },
}));

