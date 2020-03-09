import React from 'react';
import { ImageStyle, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Button, Icon, IconElement, Layout, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';
import { AppMapping, AppTheme, ThemeContext, ThemeContextType } from '../services/theme.service';

export const ColorPaletteIcon = (props: ImageStyle): IconElement => (
  <Icon {...props} name='color-palette-outline'/>
);

export const ShowcaseIFrame = (Component: React.ComponentType, showcaseId: string): React.ReactElement => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const onThemesButtonPress = (): void => {
    setMenuVisible(!menuVisible);
  };

  const onEvaLightPress = ({ index }): void => {
    setTheme(AppMapping.eva, AppTheme.light);
    setMenuVisible(false);
  };

  const onEvaDarkPress = ({ index }): void => {
    setTheme(AppMapping.eva, AppTheme.dark);
    setMenuVisible(false);
  };

  const onMaterialLightPress = ({ index }): void => {
    setTheme(AppMapping.material, AppTheme.light);
    setMenuVisible(false);
  };

  const onMaterialDarkPress = ({ index }): void => {
    setTheme(AppMapping.material, AppTheme.dark);
    setMenuVisible(false);
  };

  const setTheme = (mapping: AppMapping, theme: AppTheme): void => {
    if (mapping !== themeContext.mapping) {
      themeContext.setMapping(mapping);
      themeContext.setTheme(theme);
      return;
    }

    if (theme !== themeContext.theme) {
      themeContext.setTheme(theme);
    }
  };

  const postLayoutChangeEvent = ({ nativeEvent }: LayoutChangeEvent): void => {
    const layoutChangeMessage: { height: number; id: string; } = {
      id: showcaseId,
      height: nativeEvent.layout.height,
    };

    window.parent.postMessage(layoutChangeMessage, '*');
  };

  const renderThemeButton = () => (
    <Button
      appearance='ghost'
      status='basic'
      size='small'
      accessoryLeft={ColorPaletteIcon}
      onPress={onThemesButtonPress}>
      {`${themeContext.mapping} ${themeContext.theme}`}
    </Button>
  );

  return (
    <Layout
      style={styles.container}
      onLayout={postLayoutChangeEvent}>
      <View style={styles.optionsContainer}>
        <Text
          appearance='hint'
          category='c1'>
          Powered by React Native Web
        </Text>
        <OverflowMenu
          anchor={renderThemeButton}
          visible={menuVisible}
          placement='bottom end'
          onBackdropPress={onThemesButtonPress}>
          <MenuItem title='Eva Light' onPress={onEvaLightPress}/>
          <MenuItem title='Eva Dark' onPress={onEvaDarkPress}/>
          <MenuItem title='Material Light' onPress={onMaterialLightPress}/>
          <MenuItem title='Material Dark' onPress={onMaterialDarkPress}/>
        </OverflowMenu>
      </View>
      <View style={styles.showcaseContainer}>
        <Component/>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 264,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  showcaseContainer: {
    flex: 1,
    paddingVertical: 4,
  },
});
