import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Layout } from '@ui-kitten/components';

export const IconThemingShowcase = () => {

  const zoomIconRef = React.useRef();
  const pulseIconRef = React.useRef();
  const shakeIconRef = React.useRef();

  React.useEffect(() => {
    zoomIconRef.current.startAnimation();
    pulseIconRef.current.startAnimation();
    shakeIconRef.current.startAnimation();
  }, []);

  const renderZoomIcon = (props) => (
    <Icon
      {...props}
      ref={zoomIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='zoom'
      name='maximize-outline'
    />
  );

  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='pulse'
      name='activity'
    />
  );

  const renderShakeIcon = (props) => (
    <Icon
      {...props}
      ref={shakeIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='shake'
      name='shake'
    />
  );

  return (
    <Layout style={styles.container} level='1'>

      <Button
        style={styles.button}
        accessoryLeft={renderZoomIcon}>
        ZOOM
      </Button>

      <Button
        appearance='outline'
        style={styles.button}
        accessoryLeft={renderPulseIcon}>
        PULSE
      </Button>

      <Button
        appearance='ghost'
        style={styles.button}
        accessoryRight={renderShakeIcon}>
        SHAKE
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
