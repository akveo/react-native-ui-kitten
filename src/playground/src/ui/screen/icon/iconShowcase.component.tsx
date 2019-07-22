import React from 'react';
import { ViewProps } from 'react-native';
import {
  Icon,
  IconProps,
  Input,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  iconName: string;
}

export class IconShowcase extends React.Component<IconProps, State> {

  public state: State = {
    iconName: 'star',
  };

  private onChangeText = (iconName: string) => {
    this.state.iconName = iconName;
  };

  private renderIcon = (style: StyleType) => {
    return (
      <Icon
        name={this.state.iconName}
        {...this.props}
        {...style}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    return (
      <Input
        style={{flex: 1}}
        placeholder='Type icon name'
        autoCapitalize='none'
        autoCorrect={false}
        caption='Unfocus to apply'
        captionIcon={this.renderIcon}
        icon={this.renderIcon}
        onChangeText={this.onChangeText}
      />
    );
  }
}
