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
  Toggle,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '@pg/components/safeAreaLayout';
import { Toolbar } from '@pg/components/toolbar.component';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '@pg/themes/themeContext';
import { SampleAuthData } from './type';

const data: SampleAuthData = SampleAuthData.mocked();

export const SampleAuthScreen = ({ navigation }): SafeAreaLayoutElement => {

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [selectedRole, setSelectedRole] = React.useState<SelectOption>(null);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const styles = StyleSheet.create();

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
    <SafeAreaLayout
      style={styles.container}
      insets={SaveAreaInset.TOP}
      level='4'>
      <Toolbar
        title='Auth'
        onBackPress={() => navigation.goBack()}
      />
      <Layout style={styles.cardContainer}>
        <Layout
          style={styles.cardHeader}
          level='4'>
          <View style={styles.themeToggleContainer}>
            <Text
              style={styles.themeText}
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
            style={styles.profileImage}
            source={require('../../assets/images/brand-logo.png')}
          />
          <View style={styles.welcomeContainer}>
            <Text category='h6'>Welcome</Text>
            <Text category='s1'>Sign up to your account</Text>
          </View>
        </Layout>
        <Layout
          style={styles.formContainer}
          level='1'>
          <Input
            style={styles.formInput}
            label='Email'
            placeholder='contact@akveo.com'
          />
          <Input
            style={styles.formInput}
            secureTextEntry={!passwordVisible}
            label='Password'
            placeholder='********'
            icon={renderPasswordIcon}
            onIconPress={onPasswordIconPress}
          />
          <Select
            style={styles.formInput}
            label='Role'
            data={data.roles.map(createRoleOption)}
            selectedOption={selectedRole}
            onSelect={setSelectedRole}
          />
          <View style={styles.forgotPasswordContainer}>
            <CheckBox
              checked={shouldRemember}
              onChange={setShouldRemember}
              text='I agree to T&C'
            />
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              status='basic'>
              Forgot password?
            </Button>
          </View>
          <Button
            style={styles.signupButton}
            appearance='ghost'
            status='basic'>
            No account yet?
          </Button>
        </Layout>
        <Button style={styles.signInButton}>SIGN IN</Button>
      </Layout>
    </SafeAreaLayout>
  );
};

const StyleSheet = useStyleSheet({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 4,
    marginHorizontal: 24,
    marginVertical: 24,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '25%',
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
    borderColor: 'border-basic-color-4',
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
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

