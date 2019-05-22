import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Avatar,
  AvatarProps,
} from '@kitten/ui';
import { Showcase } from '../common/showcase.component';
import { avatarShowcase } from './type';

export class AvatarContainer extends React.Component<NavigationScreenProps> {

  private renderItem = (props: AvatarProps): React.ReactElement<AvatarProps> => {
    return (
      <Avatar
        source={{uri: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7790309/cena.jpg'}}
        {...props}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <Showcase
        showcase={avatarShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
