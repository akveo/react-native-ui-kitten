import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
} from 'react-native';
import { RkComponent } from '../rkComponent';

const defaultAnimationDuration = 200;

/**
 * @extends React.Component
 */
export class RkTabBarIndicator extends RkComponent {
  static propTypes = {
    rkType: PropTypes.oneOf(['', 'rounded']),
    itemCount: PropTypes.number.isRequired,

    componentWidth: PropTypes.number.isRequired,
  };
  static defaultProps = {
    rkType: RkComponent.defaultProps.rkType,
  };
  componentName = 'RkTabBarIndicator';
  typeMapping = {
    container: {},
    content: {},
  };

  contentOffset = new Animated.Value(0);

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    this.scrollToOffset({
      offset: (this.props.componentWidth / this.props.itemCount) * params.index,
      ...params,
    });
  }

  /**
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollByOffset(params) {
    this.scrollToOffset({
      offset: this.contentOffset + params.offset,
      ...params,
    });
  }

  /**
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToOffset(params) {
    this.getContentOffsetAnimation(params).start();
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
    const styles = super.defineStyles(this.props.rkType);
    const transform = {
      transform: [{ translateX: this.contentOffset }],
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.content,
          { width: this.props.componentWidth / this.props.itemCount },
          transform,
        ]}
        />
      </View>
    );
  }
}
