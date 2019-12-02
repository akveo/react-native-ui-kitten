import React from 'react';
import {
  Button,
  OverflowMenu,
  OverflowMenuElement,
  OverflowMenuProps,
} from '@ui-kitten/components';

export const OverflowMenuShowcase = (props: OverflowMenuProps): OverflowMenuElement => {

  const [visible, setVisible] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(null);

  const toggleMenu = (): void => {
    setVisible(!visible);
  };

  const onSelect = (index: number): void => {
    setSelectedIndex(index);
    toggleMenu();
  };

  return (
    <OverflowMenu
      {...props}
      visible={visible}
      selectedIndex={selectedIndex}
      onSelect={onSelect}
      onBackdropPress={toggleMenu}>
      <Button onPress={toggleMenu}>
        TOGGLE MENU
      </Button>
    </OverflowMenu>
  );
};
