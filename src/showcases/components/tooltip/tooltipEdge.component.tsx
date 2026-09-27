import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Tooltip } from '@ui-kitten/components';

// #1693: a tooltip with a long text anchored near a screen edge used to run off screen.

const LONG = 'This tooltip carries a long sentence so that it is much wider than its anchor and ends up beyond the edge of the screen unless the placement service keeps it inside';
const MEDIUM = 'Wider than the anchor, narrower than the screen';

interface EdgeTooltipProps {
  testID: string;
  align: 'flex-start' | 'center' | 'flex-end';
  text: string;
  placement?: string;
}

const EdgeTooltip = ({ testID, align, text, placement }: EdgeTooltipProps): React.ReactElement => {
  const [visible, setVisible] = React.useState(false);

  const renderAnchor = (): React.ReactElement => (
    <Button
      testID={`${testID}-anchor`}
      size='small'
      onPress={() => setVisible(true)}
    >
      TIP
    </Button>
  );

  return (
    <View style={[styles.row, { alignItems: align }]}>
      <Tooltip
        testID={testID}
        anchor={renderAnchor}
        visible={visible}
        placement={placement}
        onBackdropPress={() => setVisible(false)}
      >
        {text}
      </Tooltip>
    </View>
  );
};

export const TooltipEdgeShowcase = (): React.ReactElement => (
  <Layout level='1'>
    <EdgeTooltip testID='tooltip-edge-right' align='flex-end' text={LONG} />
    <EdgeTooltip testID='tooltip-edge-right-medium' align='flex-end' text={MEDIUM} />
    <EdgeTooltip testID='tooltip-edge-left' align='flex-start' text={LONG} placement='bottom' />
    <EdgeTooltip testID='tooltip-edge-center' align='center' text={LONG} />
  </Layout>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
});
