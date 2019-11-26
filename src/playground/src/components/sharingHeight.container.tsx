import React from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Layout,
  LayoutProps,
  OverflowMenu,
  OverflowMenuItemType,
  Text,
} from 'react-native-ui-kitten';
import {
  AppTheme,
  ThemeContext,
  ThemeContextType,
} from '@pg/themes/themeContext';
import { ColorPaletteIcon } from '@pg/icons';

interface Props {
  showcaseId: string;
}

export type SharingHeightContainerProps = LayoutProps & Props;

const themes: AppTheme[] = [AppTheme.light, AppTheme.dark];

export const sharingHeightContainer = (Component: React.ComponentType,
                                       showcaseId: string): React.ReactElement<SharingHeightContainerProps> => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onThemesButtonPress = (): void => {
    setMenuVisible(!menuVisible);
  };

  const onThemeSelect = (index: number): void => {
    themeContext.setTheme(themes[index]);
    setMenuVisible(false);
  };

  const onLayout = (event: LayoutChangeEvent): void => {
    if (Platform.OS === 'web') {
      postLayoutChangeEvent(event);
    }
  };

  const postLayoutChangeEvent = ({ nativeEvent }: LayoutChangeEvent): void => {
    const layoutChangeMessage: { height: number; id: string; } = {
      id: showcaseId,
      height: nativeEvent.layout.height,
    };

    window.parent.postMessage(layoutChangeMessage, '*');
  };

  const createThemeMenuItem = (title: string): OverflowMenuItemType => {
    return { title };
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
          data={themes.map(createThemeMenuItem)}
          onBackdropPress={onThemesButtonPress}>
          <Button
            appearance='ghost'
            status='basic'
            size='small'
            icon={ColorPaletteIcon}
            onPress={onThemesButtonPress}>
            {themeContext.theme}
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
    minHeight: 170,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
