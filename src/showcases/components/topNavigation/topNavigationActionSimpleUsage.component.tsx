import React from 'react';
import { Icon, IconElement, Text, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

export const TopNavigationActionSimpleUsageShowcase = (): React.ReactElement => {
  const [presses, setPresses] = React.useState(0);
  return (
    <>
      <Text testID='top-navigation-action-count'>{`Presses: ${presses}`}</Text>
      <TopNavigationAction testID='top-navigation-action' icon={BackIcon} onPress={() => setPresses((n) => n + 1)} />
    </>
  );
};
