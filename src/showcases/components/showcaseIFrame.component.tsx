import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { ShowcaseSettings } from './showcaseSettings.component';

const ShowcaseCaption = (props) => (
  <View {...props}>
    <Text
      appearance='hint'
      category='c2'>
      Powered by React Native Web
    </Text>
    <Text
      appearance='hint'
      category='c1'>
      Rendering of React Native components in a web browser is an experimental feature and may contain issues.
    </Text>
  </View>
);

export const ShowcaseIFrame = (Component: React.ComponentType, id: string): React.ReactElement => {

  const postLayoutChangeEvent = (event: LayoutChangeEvent): void => {
    window.parent.postMessage({ id, height: event.nativeEvent.layout.height }, '*');
  };

  return (
    <Card
      style={styles.card}
      disabled={true}
      header={props => <ShowcaseSettings {...props}/>}
      footer={props => <ShowcaseCaption {...props}/>}
      onLayout={postLayoutChangeEvent}>
      <Component/>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
});
