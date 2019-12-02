import React from 'react';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { AvatarShowcase } from './avatarShowcase.component';
import { avatarShowcase } from './type';

export const AvatarScreen = ({ navigation }): React.ReactElement => (
  <ShowcaseContainer
    showcase={avatarShowcase}
    renderItem={AvatarShowcase}
    onBackPress={() => navigation.goBack()}
  />
);
