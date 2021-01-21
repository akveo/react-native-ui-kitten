import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Layout } from '@ui-kitten/components';

export const IconAnimationShowcase = () => {

  const zoomIconRef = React.useRef();
  const pulseIconRef = React.useRef();
  const shakeIconRef = React.useRef();
  const infiniteAnimationIconRef = React.useRef();
  const noAnimationIconRef = React.useRef();

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

  const renderShakeIcon = (props) => (
    <Icon
      {...props}
      ref={shakeIconRef}
      animation='shake'
      name='shake'
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

  const renderNoAnimationIcon = (props) => (
    <Icon
      {...props}
      ref={noAnimationIconRef}
      animation={null}
      name='eye'
    />
  );

  return (
    <Layout style={styles.container} level='1'>

      <Button
        style={styles.button}
        accessoryLeft={renderZoomIcon}
        onPress={() => zoomIconRef.current.startAnimation()}>
        ZOOM
      </Button>

      <Button
        appearance='outline'
        status='success'
        style={styles.button}
        accessoryLeft={renderPulseIcon}
        onPress={() => pulseIconRef.current.startAnimation()}>
        PULSE
      </Button>

      <Button
        appearance='ghost'
        status='danger'
        style={styles.button}
        accessoryLeft={renderShakeIcon}
        onPress={() => shakeIconRef.current.startAnimation()}>
        SHAKE
      </Button>

      <Button
        appearance='ghost'
        status='info'
        style={styles.button}
        accessoryRight={renderInfiniteAnimationIcon}>
        INFINITE
      </Button>

      <Button
        appearance='ghost'
        status='warning'
        style={styles.button}
        accessoryRight={renderNoAnimationIcon}>
        NO ANIMATION
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
