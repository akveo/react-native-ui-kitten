import React, { useState } from 'react';
import {
  Platform,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import {
  Layout,
  LayoutProps,
  Button,
  OverflowMenu,
  OverflowMenuItemType,
} from '@kitten/ui';
import {
  ThemeContext,
  themes,
} from '../../src/themes';

interface Props {
  showcaseId: string;
}

export type SharingHeightContainerProps = LayoutProps & Props;

export const sharingHeightContainer = (Component: React.ComponentType,
                                       showcaseId: string): React.ReactElement<SharingHeightContainerProps> => {

  const [menuVisible, onChangeMenuVisible] = useState(false);

  const onHeightShare = (event: LayoutChangeEvent): void => {
    const { height } = event.nativeEvent.layout;
    const shared: { height: number; id: string; } = {
      id: showcaseId,
      height: height,
    };
    window.parent.postMessage(shared, '*');
  };

  const onLayout = (event: LayoutChangeEvent): void => {
    if (Platform.OS === 'web') {
      onHeightShare(event);
    }
  };

  const setMenuVisible = (): void => {
    const visible: boolean = !menuVisible;

    onChangeMenuVisible(visible);
  };

  const createThemeMenuItem = (theme: string): OverflowMenuItemType => {
    return {
      title: theme,
    };
  };

  const createThemesMenuItems = (): OverflowMenuItemType[] => {
    return Object.keys(themes).map(createThemeMenuItem);
  };

  const onToggleTheme = (index: number, toggler: (theme: string) => void): void => {
    const { [index]: theme } = Object.keys(themes);

    toggler(theme);
    onChangeMenuVisible(false);
  };

  const renderContent = ({ toggleTheme }): React.ReactElement<LayoutProps> => {
    return (
      <Layout
        style={styles.container}
        onLayout={onLayout}>
        <OverflowMenu
          placement='bottom end'
          visible={menuVisible}
          onSelect={(index: number) => onToggleTheme(index, toggleTheme)}
          data={createThemesMenuItems()}
          onBackdropPress={setMenuVisible}>
          <Button
            size='small'
            style={styles.themeButton}
            onPress={setMenuVisible}>
            THEMES
          </Button>
        </OverflowMenu>
        <Component/>
      </Layout>
    );
  };

  return (
    <ThemeContext.Consumer>
      {renderContent}
    </ThemeContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  themeButton: {
    width: 100,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
});
