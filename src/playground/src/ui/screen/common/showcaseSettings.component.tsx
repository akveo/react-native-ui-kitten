import React from 'react';
import {
  I18nManager,
  View,
  ViewProps,
} from 'react-native';
import { Updates } from 'expo';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  CheckBox,
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
      title: setting.description || `${setting.propertyName}: ${setting.value}`,
    };
  };

  private createThemeMenuItem = (theme: string): OverflowMenuItemType => {
    return {
      title: theme,
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

  private toggleRtl = () => {
    I18nManager.forceRTL(!I18nManager.isRTL);
    I18nManager.allowRTL(I18nManager.isRTL);
    Updates.reload();
  };

  public render(): React.ReactNode {
    const { style, themedStyle } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <OverflowMenu
          placement='bottom start'
          visible={this.state.themesMenuVisible}
          onSelect={this.onThemeSelect}
          data={this.createThemesMenuItems()}
          onBackdropPress={this.toggleThemesMenu}>
          <Button
            size='small'
            disabled={!this.props.themes}
            onPress={this.toggleThemesMenu}>
            THEMES
          </Button>
        </OverflowMenu>
        <OverflowMenu
          placement='bottom start'
          visible={this.state.settingsMenuVisible}
          onSelect={this.onSettingSelect}
          data={this.createSettingsMenuItems()}
          onBackdropPress={this.toggleSettingsMenu}>
          <Button
            size='small'
            disabled={!this.props.settings}
            onPress={this.toggleSettingsMenu}>
            SETTINGS
          </Button>
        </OverflowMenu>
        <Button
          size='small'
          disabled={!this.props.settings}
          onPress={this.onResetButtonPress}>
          RESET
        </Button>
        <CheckBox
          checked={I18nManager.isRTL}
          onChange={this.toggleRtl}
          text='RTL'
        />
      </View>
    );
  }
}

export const ShowcaseSettings = withStyles(ShowcaseSettingsComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
