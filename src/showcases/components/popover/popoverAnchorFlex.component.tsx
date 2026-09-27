import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Popover, Text } from '@ui-kitten/components';

// #1791: two popovers in a row whose anchors share the width through `flex`. The anchor is
// wrapped in a measuring view, so the flex has to be applied to that wrapper through
// `anchorContainerStyle`; a `flex` on the button alone has no effect.

interface FlexPopoverProps {
  testID: string;
  flex: number;
  label: string;
}

const FlexPopover = ({ testID, flex, label }: FlexPopoverProps): React.ReactElement => {
  const [visible, setVisible] = React.useState(false);

  const renderAnchor = (): React.ReactElement => (
    <Button
      testID={`${testID}-anchor`}
      style={styles.anchor}
      onPress={() => setVisible(true)}
    >
      {label}
    </Button>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderAnchor}
      anchorContainerStyle={{ flex }}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout
        testID={`${testID}-content`}
        style={styles.content}
      >
        <Text>{`${label} content`}</Text>
      </Layout>
    </Popover>
  );
};

export const PopoverAnchorFlexShowcase = (): React.ReactElement => (
  <View
    testID='popover-anchor-flex-row'
    style={styles.row}
  >
    <FlexPopover
      testID='popover-flex-1'
      flex={1}
      label='ONE'
    />
    <FlexPopover
      testID='popover-flex-2'
      flex={2}
      label='TWO'
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  anchor: {
    marginHorizontal: 4,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
