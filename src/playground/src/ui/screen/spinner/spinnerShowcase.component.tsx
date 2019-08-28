import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Spinner,
  SpinnerProps,
  SpinnerElement,
} from '@kitten/ui';

export const SpinnerShowcase = (props?: SpinnerProps): SpinnerElement => {
  if (props.status === 'white') {
    return WhiteSpinner(props);
  } else {
    return DefaultSpinner(props);
  }
};

const DefaultSpinner = (props?: SpinnerProps): SpinnerElement => {
  return (
    <Spinner {...props} />
  );
};

const WhiteSpinner = (props?: SpinnerProps): React.ReactElement<ViewProps> => {
  return (
    <View style={styles.blackSpinnerContainer}>
      <Spinner {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  blackSpinnerContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#7f7e82',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
