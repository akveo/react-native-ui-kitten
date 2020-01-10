import React from 'react';
import {
  Layout,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';

export const UseStyleSheetSimpleUsageShowcase = () => {
  const styles = StyleSheet.create();

  return (
    <Layout style={styles.container}>
      <Text category='h4' status='control'>
        I use success color as background!
      </Text>
    </Layout>
  );
};

const StyleSheet = useStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-success-default',
  },
});
