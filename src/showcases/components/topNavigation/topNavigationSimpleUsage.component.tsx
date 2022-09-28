import React from 'react';
import { Icon, IconElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

const BackAction = (): React.ReactElement => (
  <TopNavigationAction icon={BackIcon} />
);

export const TopNavigationSimpleUsageShowcase = (): React.ReactElement => (
  <TopNavigation
    accessoryLeft={BackAction}
    title='Eva Application'
  />
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TopNavigationStyling = (): React.ReactElement => (
  <TopNavigation
    title={evaProps => (
      <Text {...evaProps}>
Title
      </Text>
    )}
    subtitle={evaProps => (
      <Text {...evaProps}>
Subtitle
      </Text>
    )}
  />
);
