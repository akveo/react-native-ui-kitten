import React from 'react';
import {
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  IconElement,
  Layout,
  OverflowMenu,
  OverflowMenuItemType,
  Text,
} from '@ui-kitten/components';
import { themes } from '../app/themes';
import {
  AppMapping,
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '../services/theme.service';

export const ColorPaletteIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='color-palette-outline'/>
);

const createThemesMenu = (): OverflowMenuItemType[] => {
  return Object.keys(themes).reduce((acc: OverflowMenuItemType[], mappingName: string) => {
    const themeItems: OverflowMenuItemType[] = Object.keys(themes[mappingName])
                                                     .map((themeName) => ({ title: `${mappingName} ${themeName}` }));
    return [...acc, ...themeItems];
  }, []);
};

const themesMenu = createThemesMenu();

export const ShowcaseIFrame = (Component: React.ComponentType, showcaseId: string): React.ReactElement => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onThemesButtonPress = (): void => {
    setMenuVisible(!menuVisible);
  };

  const onThemeSelect = (index: number): void => {
    const [mapping, theme] = themesMenu[index].title.split(' ');

    setMenuVisible(false);

    if (mapping !== themeContext.mapping) {
      themeContext.setMapping(mapping as AppMapping);
      themeContext.setTheme(theme as AppTheme);
      return;
    }

    if (theme !== themeContext.theme) {
      themeContext.setTheme(theme as AppTheme);
    }
  };

  const onLayout = (event: LayoutChangeEvent): void => {
    postLayoutChangeEvent(event);
  };

  const postLayoutChangeEvent = ({ nativeEvent }: LayoutChangeEvent): void => {
    const layoutChangeMessage: { height: number; id: string; } = {
      id: showcaseId,
      height: nativeEvent.layout.height,
    };

    window.parent.postMessage(layoutChangeMessage, '*');
  };

  return (
    <Layout
      style={styles.container}
      onLayout={onLayout}>
      <View style={styles.optionsContainer}>
        <Text
          appearance='hint'
          category='c1'>
          Powered by React Native Web
        </Text>
        <OverflowMenu
          visible={menuVisible}
          onSelect={onThemeSelect}
          data={themesMenu}
          onBackdropPress={onThemesButtonPress}>
          <Button
            appearance='ghost'
            status='basic'
            size='small'
            icon={ColorPaletteIcon}
            onPress={onThemesButtonPress}>
            {`${themeContext.mapping} ${themeContext.theme}`}
          </Button>
        </OverflowMenu>
      </View>
      <Component/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 280,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
