import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
} from 'react-native';
import { RkStyleSheet } from '../../styles/styleSheet';

const defaultAnimationDuration = 200;

export class RkTabBarIndicator extends React.PureComponent {
  static propTypes = {
    itemCount: PropTypes.number.isRequired,
    contentWidth: PropTypes.number.isRequired,
  };

  contentOffset = new Animated.Value(0);

  /**
   * @param params - object: { index: number, animated: boolean }
   * @param onComplete - function: scroll completion callback
   */
  scrollToIndex(params, onComplete = (() => null)) {
    this.scrollToOffset({
      offset: (this.props.contentWidth / this.props.itemCount) * params.index,
      ...params,
    }, onComplete);
  }

  /**
   * @param params - object: { offset: number, animated: boolean }
   * @param onComplete - function: scroll completion callback
   */
  scrollByOffset(params, onComplete = (() => null)) {
    this.scrollToOffset({
      offset: this.contentOffset + params.offset,
      ...params,
    }, onComplete);
  }

  /**
   * @param params - object: { offset: number, animated: boolean }
   * @param onComplete - function: scroll completion callback
   */
  scrollToOffset(params, onComplete = (() => null)) {
    this.getContentOffsetAnimation(params).start(onComplete);
  }

  /**
   * @param params - object: {
   *    offset: {
   *      x: number,
   *      y: number,
   *    },
   *    animated: boolean
   *    }
   */
  getContentOffsetAnimation = (params) => {
    const isAnimated = params.animated === undefined ? true : params.animated;
    const animationDuration = isAnimated ? defaultAnimationDuration : 0;
    return Animated.timing(this.contentOffset, {
      toValue: params.offset,
      duration: animationDuration,
    });
  };

  render() {
    const transform = {
      transform: [{ translateX: this.contentOffset }],
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.content,
          { width: this.props.contentWidth / this.props.itemCount },
          transform,
        ]}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(({
  container: {
    height: 16,
    backgroundColor: 'black',
    paddingVertical: 2,
  },
  content: {
    flex: 1,
    backgroundColor: 'yellow',
  },
}));
