import React from 'react';
import { StyleSheet } from 'react-native';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '@pg/themes/themeContext';
import {
  ComponentShowcase,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import {
  SafeAreaLayout,
  SafeAreaLayoutProps,
  SaveAreaInset,
} from './safeAreaLayout';
import { Toolbar } from './toolbar.component';
import { Showcase } from './showcase.component';
import { ShowcaseSettings } from './showcaseSettings.component';

interface ShowcaseContainerProps extends SafeAreaLayoutProps {
  showcase: ComponentShowcase;
  settings?: ComponentShowcaseSetting[];
  renderItem: (props: any) => React.ReactElement<any>;
  onBackPress?: () => void;
}

export const ShowcaseContainer = (props: ShowcaseContainerProps): React.ReactElement => {

  const [showcaseSettings, setShowcaseSettings] = React.useState({});
  const themeContext: ThemeContextType = React.useContext(ThemeContext);
  const themes: AppTheme[] = [AppTheme.light, AppTheme.dark];

  const onSelectSetting = (selectedSettings: { [prop: string]: any }): void => {
    setShowcaseSettings({ ...settings, ...selectedSettings });
  };

  const onResetSettings = (): void => {
    setShowcaseSettings({});
  };

  const { showcase, settings, renderItem, children, onBackPress, style, ...layoutProps } = props;

  return (
    <SafeAreaLayout
      insets={SaveAreaInset.TOP}
      style={[styles.container, style]}>
      <Toolbar
        title={showcase.title}
        onBackPress={onBackPress}
      />
      <ShowcaseSettings
        themes={themes}
        settings={settings}
        onSettingSelect={onSelectSetting}
        onThemeSelect={themeContext.setTheme}
        onReset={onResetSettings}
      />
      {children}
      <Showcase
        showcase={showcase}
        renderItem={renderItem}
        settings={showcaseSettings}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
