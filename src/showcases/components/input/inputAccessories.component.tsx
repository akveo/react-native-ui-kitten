import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, Input, Text } from '@ui-kitten/components';

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);

export const InputAccessoriesShowcase = () => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
      </View>
    )
  }

  return (
    <Input
      value={value}
      label='Password'
      placeholder='Place your Text'
      caption={renderCaption}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  }
});
