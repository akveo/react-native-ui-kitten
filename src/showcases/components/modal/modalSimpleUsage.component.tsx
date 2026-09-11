import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  IndexPath,
  Input,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
  Tooltip,
} from '@ui-kitten/components';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export const ModalSimpleUsageShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | undefined>();
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const selectedValue = selectedIndex ? OPTIONS[selectedIndex.row] : undefined;

  const renderTooltipAnchor = (): React.ReactElement => (
    <Button
      appearance='outline'
      onPress={() => setTooltipVisible(true)}
    >
      SHOW TOOLTIP
    </Button>
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Button onPress={() => setVisible(true)}>
        TOGGLE MODAL
      </Button>

      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>
Welcome to UI Kitten 😻
          </Text>
          {/*
            Overlays opened from inside a Modal present through the modal's own outlet
            (iOS allows a single chain of presented modals), and the controlled Input
            checks that the hoisted content keeps up with the call site's state.
          */}
          <Input
            testID='modal-input'
            placeholder='Type inside the modal'
            value={value}
            onChangeText={setValue}
          />
          <Select
            testID='modal-select'
            placeholder='Pick an option'
            value={selectedValue}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index as IndexPath)}
          >
            {OPTIONS.map((option) => (
              <SelectItem
                key={option}
                title={option}
              />
            ))}
          </Select>
          <Tooltip
            anchor={renderTooltipAnchor}
            visible={tooltipVisible}
            onBackdropPress={() => setTooltipVisible(false)}
          >
            Presented above the modal
          </Tooltip>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
});
