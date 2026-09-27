import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';

// Decimal content sizes used to make the modal oscillate between two positions (#1767, #1802):
// the measured frame and the centred origin never settled on the same pixel. `NEXT SIZE` cycles
// through the fractions so a sweep can try each one.
const WINDOW = Dimensions.get('window');
const FRACTIONS = [0.56, 0.561, 0.5625, 0.57, 0.6, 0.618, 0.7, 0.75, 0.8, 0.85, 0.9, 0.31];
const SIZES = FRACTIONS.map((fraction) => ({
  width: WINDOW.width * fraction,
  height: WINDOW.height * (fraction * 0.55),
}));

export const ModalDecimalSizeShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const [layouts, setLayouts] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const size = SIZES[index];

  const onOpen = (): void => {
    setLayouts(0);
    setVisible(true);
  };

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Button testID='modal-decimal-toggle' onPress={onOpen}>
        TOGGLE DECIMAL MODAL
      </Button>
      <Button
        testID='modal-decimal-next'
        appearance='outline'
        onPress={() => setIndex((current) => (current + 1) % SIZES.length)}
      >
        NEXT SIZE
      </Button>

      <Text testID='modal-decimal-size' category='c1'>
        {`size ${index}: ${size.width.toFixed(2)} x ${size.height.toFixed(2)} (window ${WINDOW.width.toFixed(2)} x ${WINDOW.height.toFixed(2)})`}
      </Text>

      <Modal
        testID='modal-decimal'
        visible={visible}
        style={{ width: size.width, height: size.height }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card
          disabled={true}
          style={styles.card}
          onLayout={() => setLayouts((count) => count + 1)}
        >
          <Text testID='modal-decimal-layouts'>
            {`layouts: ${layouts}`}
          </Text>
          <Button
            testID='modal-decimal-dismiss'
            onPress={() => setVisible(false)}
          >
            DISMISS
          </Button>
        </Card>
      </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 160,
  },
  card: {
    flex: 1,
  },
});
