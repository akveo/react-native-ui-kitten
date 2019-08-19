import { Animated } from 'react-native';

export const DEFAULT_CONFIG: AnimationConfig = {
  cycles: 1,
  useNativeDriver: true,
};

/**
 * @property cycles - number of animation cycles. -1 for infinite
 */
export interface AnimationConfig extends Animated.AnimationConfig {
  cycles?: number;
}

export abstract class Animation<C extends AnimationConfig, R> {

  protected abstract animation: Animated.CompositeAnimation;
  protected counter: number = 0;
  protected endCallback: Animated.EndCallback;
  protected running: boolean = false;
  protected config: C;

  public abstract toProps(): R;

  constructor(config?: C) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public start(callback?: Animated.EndCallback) {
    this.endCallback = callback;
    this.running = true;

    this.animation.start(this.onAnimationEnd);
  }

  public stop() {
    this.running = false;

    this.animation.stop();
  }

  public release() {
    this.stop();
  }

  protected onAnimationEnd = (result: Animated.EndResult) => {
    this.counter += 1;
    if (this.counter === this.config.cycles) {
      this.stop();
    }
    if (this.running) {
      this.start(this.endCallback);
    }
    if (!this.running) {
      this.counter = 0;
      this.endCallback && this.endCallback(result);
      this.endCallback = null;
    }
  };
}
