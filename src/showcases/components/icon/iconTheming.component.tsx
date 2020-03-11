import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Layout } from '@ui-kitten/components';

export const IconThemingShowcase = () => {

  const zoomIconRef = React.useRef();
  const pulseIconRef = React.useRef();
  const infiniteAnimationIconRef = React.useRef();

  React.useEffect(() => {
    infiniteAnimationIconRef.current.startAnimation();
  }, []);

  const renderZoomIcon = (props) => (
    <Icon
      {...props}
      ref={zoomIconRef}
      animation='zoom'
      name='maximize-outline'
    />
  );

  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animation='pulse'
      name='activity'
    />
  );

  const renderInfiniteAnimationIcon = (props) => (
    <Icon
      {...props}
      ref={infiniteAnimationIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='shake'
      name='clock-outline'
    />
  );

  return (
    <Layout style={styles.container}>

      <Button
        style={styles.button}
        accessoryLeft={renderZoomIcon}
        onPress={() => zoomIconRef.current.startAnimation()}>
        ZOOM
      </Button>

      <Button
        appearance='outline'
        style={styles.button}
        accessoryLeft={renderPulseIcon}
        onPress={() => pulseIconRef.current.startAnimation()}>
        PULSE
      </Button>

      <Button
        appearance='ghost'
        style={styles.button}
        accessoryRight={renderInfiniteAnimationIcon}>
        INFINITE
      </Button>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
  },
});
