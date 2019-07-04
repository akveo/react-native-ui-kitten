import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  OverflowMenu,
  OverflowMenuItemType,
} from '@kitten/ui';
import {
  ComponentShowcaseSetting,
  ShowcaseThemes,
} from './type';

interface ComponentProps {
  themes?: ShowcaseThemes;
  settings?: ComponentShowcaseSetting[];
  onThemeSelect?: (theme: string) => void;
  onSettingSelect?: (setting: { [prop: string]: any }) => void;
  onReset: () => void;
}

interface State {
  themesMenuVisible: boolean;
  settingsMenuVisible: boolean;
}

export type ShowcaseSettingsProps = ThemedComponentProps & ViewProps & ComponentProps;

class ShowcaseSettingsComponent extends React.Component<ShowcaseSettingsProps, State> {

  public state: State = {
    themesMenuVisible: false,
    settingsMenuVisible: false,
  };

  private createSettingMenuItem = (setting: ComponentShowcaseSetting): OverflowMenuItemType => {
    return {
      text: setting.description || `${setting.propertyName}: ${setting.value}`,
    };
  };

  private createThemeMenuItem = (theme: string): OverflowMenuItemType => {
    return {
      text: theme,
    };
  };

  private onThemeSelect = (index: number) => {
    const { [index]: theme } = Object.keys(this.props.themes);

    this.props.onThemeSelect(theme);
    this.setState({ themesMenuVisible: false });
  };

  private onResetButtonPress = () => {
    this.props.onReset();
  };

  private onSettingSelect = (index: number) => {
    const { [index]: setting } = this.props.settings;

    this.props.onSettingSelect({
      [setting.propertyName]: setting.value,
    });
    this.setState({ settingsMenuVisible: false });
  };

  private createThemesMenuItems = (): OverflowMenuItemType[] => {
    if (this.props.themes) {
      return Object.keys(this.props.themes).map(this.createThemeMenuItem);
    }
  };

  private createSettingsMenuItems = (): OverflowMenuItemType[] => {
    if (this.props.settings) {
      return this.props.settings.map(this.createSettingMenuItem);
    }

    return [];
  };

  private toggleThemesMenu = () => {
    const themesMenuVisible: boolean = !this.state.themesMenuVisible;

    this.setState({ themesMenuVisible });
  };

  private toggleSettingsMenu = () => {
    const settingsMenuVisible: boolean = !this.state.settingsMenuVisible;

    this.setState({ settingsMenuVisible });
  };

  public render(): React.ReactNode {
    const { style, themedStyle } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <OverflowMenu
          placement='bottom start'
          visible={this.state.themesMenuVisible}
          onSelect={this.onThemeSelect}
          items={this.createThemesMenuItems()}
          onRequestClose={this.toggleThemesMenu}>
          <Button
            style={themedStyle.button}
            disabled={!this.props.themes}
            onPress={this.toggleThemesMenu}>
            THEMES
          </Button>
        </OverflowMenu>
        <OverflowMenu
          placement='bottom start'
          visible={this.state.settingsMenuVisible}
          onSelect={this.onSettingSelect}
          items={this.createSettingsMenuItems()}
          onRequestClose={this.toggleSettingsMenu}>
          <Button
            style={themedStyle.button}
            disabled={!this.props.settings}
            onPress={this.toggleSettingsMenu}>
            SETTINGS
          </Button>
        </OverflowMenu>
        <Button
          style={themedStyle.button}
          disabled={!this.props.settings}
          onPress={this.onResetButtonPress}>
          RESET
        </Button>
      </View>
    );
  }
}

export const ShowcaseSettings = withStyles(ShowcaseSettingsComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
