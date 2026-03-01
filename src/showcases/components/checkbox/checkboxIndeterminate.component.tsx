import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

export const CheckboxIndeterminateShowcase = (): React.ReactElement => {

  const [allChecked, setAllChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [readChecked, setReadChecked] = React.useState(false);
  const [writeChecked, setWriteChecked] = React.useState(false);

  const onGroupCheckedChange = (checked): void => {
    setReadChecked(checked);
    setWriteChecked(checked);
    setAllChecked(checked);
    updateGroup(checked, checked);
  };

  const onReadCheckedChange = (checked): void => {
    setReadChecked(checked);
    updateGroup(checked, writeChecked);
  };

  const onWriteCheckedChange = (checked): void => {
    setWriteChecked(checked);
    updateGroup(checked, readChecked);
  };

  const updateGroup = (...states): void => {
    const someChecked = states.some((item) => item === true);
    const everyChecked = states.every((item) => item === true);

    if (someChecked && !everyChecked) {
      setAllChecked(true);
      setIndeterminate(true);
    } else if (!someChecked && !everyChecked) {
      setAllChecked(false);
      setIndeterminate(false);
    } else if (everyChecked) {
      setAllChecked(true);
      setIndeterminate(false);
    }
  };

  return (
    <>
      <CheckBox
        style={styles.group}
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={onGroupCheckedChange}
      >
        Permissions
      </CheckBox>
      <CheckBox
        style={styles.option}
        checked={readChecked}
        onChange={onReadCheckedChange}
      >
        Read
      </CheckBox>
      <CheckBox
        style={styles.option}
        checked={writeChecked}
        onChange={onWriteCheckedChange}
      >
        Write
      </CheckBox>
    </>
  );
};

export const styles = StyleSheet.create({
  group: {
    marginVertical: 4,
  },
  option: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
});
