import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

export const CheckboxIndeterminateShowcase = () => {

  const [allChecked, setAllChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [readChecked, setReadChecked] = React.useState(false);
  const [writeChecked, setWriteChecked] = React.useState(false);

  const onGroupCheckedChange = (checked) => {
    setReadChecked(checked);
    setWriteChecked(checked);
    setAllChecked(checked);
    updateGroup(checked, checked);
  };

  const onReadCheckedChange = (checked) => {
    setReadChecked(checked);
    updateGroup(checked, writeChecked);
  };

  const onWriteCheckedChange = (checked) => {
    setWriteChecked(checked);
    updateGroup(checked, readChecked);
  };

  const updateGroup = (...states) => {
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
    <React.Fragment>
      <CheckBox
        style={styles.group}
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={onGroupCheckedChange}>
        Permissions
      </CheckBox>
      <CheckBox
        style={styles.option}
        checked={readChecked}
        onChange={onReadCheckedChange}>
        Read
      </CheckBox>
      <CheckBox
        style={styles.option}
        checked={writeChecked}
        onChange={onWriteCheckedChange}>
        Write
      </CheckBox>
    </React.Fragment>
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
