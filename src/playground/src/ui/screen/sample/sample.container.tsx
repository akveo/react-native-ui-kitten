import React from 'react';
import { Sample } from './sample.component';
import {
  ContextType,
  ThemeContext,
  ThemeKey,
} from '../../../themes';
import { ImageSourcePropType } from 'react-native';

export class SampleContainer extends React.Component {

  private profileImage: ImageSourcePropType = require('../../../assets/brand-logo.png');

  private isDarkTheme = (context: ContextType): boolean => {
    return context.name === 'Eva Dark';
  };

  private toggleTheme = (context: ContextType, dark: boolean) => {
    const nextTheme: ThemeKey = dark ? 'Eva Dark' : 'Eva Light';

    context.toggleTheme(nextTheme);
  };

  private renderContent = (context: ContextType): React.ReactNode => {
    return (
      <Sample
        profileImage={this.profileImage}
        isDark={() => this.isDarkTheme(context)}
        setTheme={(dark: boolean) => this.toggleTheme(context, dark)}
      />
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
