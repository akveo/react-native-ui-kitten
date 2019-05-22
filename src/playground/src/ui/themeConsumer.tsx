import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  ImageProps,
  Image,
} from 'react-native';
import { Button } from '@kitten/ui';
import { ThemeContext } from './themeContext';
import { StyleType, ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

interface Props extends ThemedComponentProps {
  children: React.ReactElement<any>;
}

export class ThemeConsumerComponent extends React.Component<Props> {

  private isThemeButtonDisabled = (currentTheme: string, buttonResponsibility: string): boolean => {
    if (currentTheme === 'light' && buttonResponsibility === 'light') {
      return true;
    } else if (currentTheme === 'dark' && buttonResponsibility === 'light') {
      return false;
    } else if (currentTheme === 'light' && buttonResponsibility === 'dark') {
      return false;
    } else if (currentTheme === 'dark' && buttonResponsibility === 'dark') {
      return true;
    }
  };

  private renderThemeButtonIcon = (style: StyleType,
                                   disabled: boolean): React.ReactElement<ImageProps> => {

    const iconUri: string = disabled ?
      'https://akveo.github.io/eva-icons/fill/png/128/checkmark.png' :
      'https://akveo.github.io/eva-icons/fill/png/128/plus.png';

    return (
      <Image
        style={style}
        source={{ uri: iconUri }}
      />
    );
  };

  private renderContent = ({ currentTheme, toggleTheme }): React.ReactElement<ViewProps> => {
    const lightBtnDis: boolean = this.isThemeButtonDisabled(currentTheme, 'light');
    const darkBtnDis: boolean = this.isThemeButtonDisabled(currentTheme, 'dark');

    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.themeButtonsContainer}>
          <Button
            disabled={lightBtnDis}
            icon={(style: StyleType) => this.renderThemeButtonIcon(style, lightBtnDis)}
            onPress={() => toggleTheme('light')}>
            Light
          </Button>
          <Button
            disabled={darkBtnDis}
            icon={(style: StyleType) => this.renderThemeButtonIcon(style, darkBtnDis)}
            onPress={() => toggleTheme('dark')}>
            Dark
          </Button>
        </View>
        {this.props.children}
      </View>
    );
  };

  public render(): React.ReactNode {
    return (
      <ThemeContext.Consumer>
        {this.renderContent}
      </ThemeContext.Consumer>
    );
  }
}

export const ThemeConsumer = withStyles(ThemeConsumerComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  themeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    backgroundColor: theme['background-color-default-2'],
  },
}));
