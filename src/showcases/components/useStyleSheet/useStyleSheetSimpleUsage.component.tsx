import React from 'react';
import {
  Layout,
  Text,
  StyleSheet,
} from '@ui-kitten/components';

export const UseStyleSheetSimpleUsageShowcase = () => {
  const styles = useStyleSheet();

  return (
    <Layout style={styles.container}>
      <Text category='h4' status='control'>
        I use success color as background!
      </Text>
    </Layout>
  );
};

const useStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-success-default',
  },
});
