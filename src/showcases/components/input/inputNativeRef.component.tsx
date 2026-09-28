import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Autocomplete, AutocompleteItem, Button, Input, Layout, Text } from '@ui-kitten/components';

// The native refs are used the way a third-party library would: `setNativeProps` and `focus`
// on the React Native TextInput itself, not through the Kitten `InputRef` API.
export const InputNativeRefShowcase = (): React.ReactElement => {

  const inputNativeRef = React.useRef<TextInput>(null);
  const autocompleteNativeRef = React.useRef<TextInput>(null);
  const [report, setReport] = React.useState('native refs: unset');

  const probe = (): void => {
    const input = inputNativeRef.current;
    const autocomplete = autocompleteNativeRef.current;
    input?.setNativeProps({ text: 'set through setNativeProps' });
    setReport(
      `native refs: input ${input ? 'TextInput' : 'null'}, autocomplete ${autocomplete ? 'TextInput' : 'null'}`,
    );
  };

  return (
    <Layout
      testID='input-native-ref'
      style={styles.container}
      level='1'
    >
      <Text testID='input-native-ref-report'>{report}</Text>
      <Input
        testID='input-native-ref-input'
        style={styles.field}
        placeholder='Input with textInputRef'
        textInputRef={inputNativeRef}
      />
      <Autocomplete
        testID='input-native-ref-autocomplete'
        style={styles.field}
        placeholder='Autocomplete with textInputRef'
        textInputRef={autocompleteNativeRef}
      >
        <AutocompleteItem title='Option' />
      </Autocomplete>
      <Button
        testID='input-native-ref-probe'
        size='small'
        onPress={probe}
      >
        Probe native refs
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  field: {
    marginTop: 4,
  },
});
