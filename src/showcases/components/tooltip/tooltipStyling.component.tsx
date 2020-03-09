import React from 'react';
import { Button, Text, Tooltip } from '@ui-kitten/components';

const MyTooltip = (props) => (
  <Tooltip
    {...props}>
    {evaProps => <Text {...evaProps}>{props.children}</Text>}
  </Tooltip>
);

export const TooltipInlineStylingShowcase = () => {

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
    </Button>
  );

  return (
    <MyTooltip
      anchor={renderToggleButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}>
      Hi!
    </MyTooltip>
  );
};
