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
  ThemeContext,
  ThemeContextType,
} from '../services/theme.service';

export const ColorPaletteIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='color-palette-outline'/>
);

export const ShowcaseIFrame = (Component: React.ComponentType, showcaseId: string): React.ReactElement => {

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
    postLayoutChangeEvent(event);
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
          data={Object.keys(themes).map(createThemeMenuItem)}
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
