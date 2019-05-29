import React from 'react';
import { AvatarProps } from '@kitten/ui';
import { AvatarShowcase } from './avatarShowcase.component';
import { avatarShowcase } from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class AvatarContainer extends React.Component {

  private renderItem = (props: AvatarProps): React.ReactElement<AvatarProps> => {
    return (
      <AvatarShowcase {...props}/>
    );
  };
  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={avatarShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
