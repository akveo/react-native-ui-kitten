import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, IconElement, IconRef, Layout } from '@ui-kitten/components';

export const IconThemingShowcase = (): React.ReactElement => {

  const zoomIconRef = React.useRef<IconRef>(null);
  const pulseIconRef = React.useRef<IconRef>(null);
  const shakeIconRef = React.useRef<IconRef>(null);

  React.useEffect(() => {
    zoomIconRef.current.startAnimation();
    pulseIconRef.current.startAnimation();
    shakeIconRef.current.startAnimation();
  }, []);

  const renderZoomIcon = (props): IconElement => (
    <Icon
      {...props}
      ref={zoomIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='zoom'
      name='maximize-outline'
    />
  );

  const renderPulseIcon = (props): IconElement => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='pulse'
      name='activity'
    />
  );

  const renderShakeIcon = (props): IconElement => (
    <Icon
      {...props}
      ref={shakeIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='shake'
      name='shake'
    />
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Button
        style={styles.button}
        accessoryLeft={renderZoomIcon}
      >
        ZOOM
      </Button>

      <Button
        appearance='outline'
        style={styles.button}
        accessoryLeft={renderPulseIcon}
      >
        PULSE
      </Button>

      <Button
        appearance='ghost'
        style={styles.button}
        accessoryRight={renderShakeIcon}
      >
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
