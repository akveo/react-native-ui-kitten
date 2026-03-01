import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  Icon, IconElement,
  Input,
  Layout,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
  Tooltip,
} from '@ui-kitten/components';

const StarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

const HeartIcon = (props): IconElement => (
  <Icon
    {...props}
    name='heart'
  />
);

const ForwardIcon = (props): IconElement => (
  <Icon
    {...props}
    name='arrow-ios-forward'
  />
);

export const IconWithinComponentsShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [selectIndex, setSelectIndex] = React.useState(undefined);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleTooltip = (): void => {
    setTooltipVisible(!tooltipVisible);
  };

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const renderInputIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={!secureTextEntry ? 'eye' : 'eye-off'}
      />
    </TouchableWithoutFeedback>
  );

  const renderTooltipButton = (): React.ReactElement => (
    <Button
      style={styles.button}
      accessoryLeft={HeartIcon}
      onPress={toggleTooltip}
    >
      PRESS ME
    </Button>
  );

  const renderMenuButton = (): React.ReactElement => (
    <Button
      style={styles.button}
      accessoryLeft={HeartIcon}
      onPress={toggleMenu}
    >
      PRESS ME
    </Button>
  );

  return (
    <>

      <Layout
        style={styles.inputContainer}
        level='1'
      >

        <Input
          style={styles.input}
          placeholder='Input'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          accessoryRight={renderInputIcon}
        />

        <Select
          style={styles.input}
          placeholder='Select'
          selectedIndex={selectIndex}
          accessoryLeft={StarIcon}
          onSelect={index => setSelectIndex(index)}
        >
          <SelectItem
            accessoryLeft={HeartIcon}
            title='Option 1'
          />
          <SelectItem
            accessoryLeft={HeartIcon}
            title='Option 2'
          />
          <SelectItem
            accessoryLeft={HeartIcon}
            title='Option 3'
          />
        </Select>

      </Layout>

      <OverflowMenu
        fullWidth={true}
        onSelect={toggleMenu}
        visible={menuVisible}
        anchor={renderMenuButton}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          title='Menu Option 1'
          accessoryRight={ForwardIcon}
        />
        <MenuItem
          title='Menu Option 2'
          accessoryRight={ForwardIcon}
        />
      </OverflowMenu>

      <Layout
        style={styles.buttonContainer}
        level='1'
      >

        <Tooltip
          anchor={renderTooltipButton}
          visible={tooltipVisible}
          accessoryLeft={StarIcon}
          onBackdropPress={toggleTooltip}
        >
          Hi!
        </Tooltip>

        <Button
          style={styles.button}
          appearance='ghost'
          accessoryLeft={StarIcon}
        />

      </Layout>

    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    margin: 2,
  },
  button: {
    margin: 2,
  },
});
