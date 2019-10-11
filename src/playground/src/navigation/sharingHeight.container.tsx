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
  IconElement,
  Icon,
  Text,
} from 'react-native-ui-kitten';
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
} from '../../src/themes';

interface Props {
  showcaseId: string;
}

export type SharingHeightContainerProps = LayoutProps & Props;

const ColorPaletteIcon = (style): IconElement => (
  <Icon {...style} name='color-palette' />
);

export const sharingHeightContainer = (Component: React.ComponentType,
                                       showcaseId: string): React.ReactElement<SharingHeightContainerProps> => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onThemesButtonPress = (): void => {
    setMenuVisible(!menuVisible);
  };

  const onThemeSelect = (index: number): void => {
    const { [index]: selectedTheme } = Object.keys(themes);

    themeContext.toggleTheme(selectedTheme as ThemeKey);
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

  const createThemeMenuItem = (theme: ThemeKey): OverflowMenuItemType => {
    return {
      title: theme,
    };
  };

  const createThemesMenuItems = (): OverflowMenuItemType[] => {
    return Object.keys(themes).map(createThemeMenuItem);
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
          data={createThemesMenuItems()}
          onBackdropPress={onThemesButtonPress}>
          <Button
            appearance='ghost'
            status='basic'
            size='small'
            icon={ColorPaletteIcon}
            onPress={onThemesButtonPress}>
            {themeContext.name}
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
