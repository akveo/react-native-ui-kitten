import React from 'react';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopNavigationSimpleUsageShowcase = () => (
  <TopNavigation
    accessoryLeft={BackAction}
    title='Eva Application'
  />
);


const TopNavigationStyling = () => (
  <TopNavigation
    title={evaProps => <Text {...evaProps}>Title</Text>}
    subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
  />
);
