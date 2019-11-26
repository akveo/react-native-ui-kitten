import React from 'react';
import {
  Button,
  Popover,
  PopoverElement,
  PopoverProps,
  Text,
  TextElement,
} from 'react-native-ui-kitten';

export const PopoverShowcase = (props: PopoverProps): PopoverElement => {

  const [visible, setVisible] = React.useState<boolean>(false);

  const togglePopover = (): void => {
    setVisible(!visible);
  };

  const renderPopoverContent = (): TextElement => {
    return (
      <Text>
        Hi! I'm Popover!
      </Text>
    );
  };

  return (
    <Popover
      {...props}
      visible={visible}
      content={renderPopoverContent()}
      onBackdropPress={togglePopover}>
      <Button onPress={togglePopover}>
        SHOW POPOVER
      </Button>
    </Popover>
  );
};
