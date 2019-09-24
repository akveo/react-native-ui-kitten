import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconProps, Icon, Button } from '@kitten/ui';
import {
  iconSettings,
  iconShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';
import { IconShowcase } from './iconShowcase.component';

export class IconContainer extends React.Component {

  private iconRef: React.RefObject<Icon<any>> = React.createRef();

  private onIconAnimate = (): void => {
    this.iconRef.current.startAnimation();
  };

  private onIconAnimateStop = (): void => {
    this.iconRef.current.stopAnimation();
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Button onPress={this.onIconAnimate}>Animate Start</Button>
        <Icon
          ref={this.iconRef}
          name='star'
          animationConfig={{
            cycles: 500,
          }}
          {...styles.icon}
        />
        <Button onPress={this.onIconAnimateStop}>Animate Stop</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    color: 'red',
    width: 50,
    height: 50,
    marginVertical: 50,
  },
});

