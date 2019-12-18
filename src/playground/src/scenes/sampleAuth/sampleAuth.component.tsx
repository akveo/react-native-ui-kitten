import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Layout,
  LayoutElement,
  Text,
  Toggle,
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
import { SampleAuthForm } from './sampleAuthForm.component';
import {
  SampleAuthData,
  SampleAuthSchema,
} from './sampleAuth.model';

export const SampleAuthScreen = ({ navigation }): SafeAreaLayoutElement => {

  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onFormSubmit = (data: SampleAuthData): void => {
    navigation.goBack();
  };

  const onThemeToggleChange = (checked: boolean): void => {
    const nextTheme: AppTheme = checked ? AppTheme.dark : AppTheme.light;
    themeContext.setTheme(nextTheme);
  };

  const renderHeader = (): LayoutElement => (
    <Layout
      style={styles.header}
      level='4'>
      <Toggle
        style={styles.themeToggle}
        checked={themeContext.isDarkMode()}
        text='Dark Mode'
        onChange={onThemeToggleChange}
      />
      <Avatar
        style={styles.profileImage}
        source={require('../../assets/images/brand-logo.png')}
      />
      <Text
        style={styles.signUpText}
        category='h4'>
        SIGN UP
      </Text>
    </Layout>
  );

  const renderFooter = (): LayoutElement => (
    <Layout style={styles.footer}>
      <Button
        style={styles.signInOptionButton}
        appearance='ghost'
        status='basic'
        onPress={navigation.goBack}>
        SIGN IN
      </Button>
      <Button
        style={styles.signInOptionButton}
        appearance='ghost'
        status='basic'
        onPress={navigation.goBack}>
        RESET PASSWORD
      </Button>
    </Layout>
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
      <Card
        style={styles.card}
        header={renderHeader}
        footer={renderFooter}>
        <SampleAuthForm
          initialValues={SampleAuthData.empty()}
          validationSchema={SampleAuthSchema}
          onSubmit={onFormSubmit}
        />
      </Card>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 160,
    paddingHorizontal: 12,
  },
  themeToggle: {
    position: 'absolute',
    right: 12,
    top: 12,
    flexDirection: 'row-reverse',
  },
  profileImage: {
    width: 96,
    height: 96,
  },
  signUpText: {
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signInOptionButton: {
    paddingHorizontal: 0,
  },
});

