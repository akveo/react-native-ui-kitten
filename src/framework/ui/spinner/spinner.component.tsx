import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import {
  SpinnerAnimation,
  SpinnerAnimationStyle,
} from './animation';
// TODO: Frame, Point, Size types should be refactored to common types
import { Size } from '../popover/type';

interface ArcElementStyle {
  container: ViewStyle;
  arc: ViewStyle;
  overflow?: ViewStyle;
}

interface ComponentProps extends ViewProps {
  animating?: boolean;
  size?: string;
  status?: string;
}

export type SpinnerProps = StyledComponentProps & ComponentProps;
export type SpinnerElement = React.ReactElement<SpinnerProps>;

/**
 * Styled Spinner component. Designed to be used as ActivityIndicator component
 *
 * @property {boolean} animating - Determines whether component is animating. Default is `true`.
 * @property {string} containerSize - Determines the the component.
 * Can be `giant`, `large`, `medium`, `small` or `tiny`.
 * Default is `medium`.
 * @property status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning` or `danger`.
 * Default is `primary`.
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Spinner } from 'react-native-ui-kitten';
 *
 * export const SpinnerShowcase = () => (
 *  <Spinner />
 * );
 * ```
 *
 * @overview-example Loading Data
 *
 * ```
 * import React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Spinner, List, ListItem } from 'react-native-ui-kitten';
 *
 * export class SpinnerDataLoading extends React.Component {
 *
 *  state = {
 *    data: [],
 *  };
 *
 *  componentDidMount() {
 *    setTimeout(this.loadData, 3000);
 *  }
 *
 *  loadData = () => {
 *    const data = [
 *      {
 *        title: 'Item 1',
 *      },
 *      {
 *        title: 'Item 2',
 *      },
 *      {
 *        title: 'Item 3',
 *      },
 *    ];
 *    this.setState({ data });
 *  };
 *
 *  private renderLoading = () => (
 *    <View style={styles.loading}>
 *      <Spinner/>
 *    </View>
 *  );
 *
 *  renderDataItem = ({ item }) => (
 *    <ListItem title={item.title}/>
 *  );
 *
 *  renderData = () => (
 *    <List data={this.state.data} renderItem={this.renderDataItem}/>
 *  );
 *
 *  render() {
 *    const isLoaded: boolean = this.state.data.length > 0;
 *    return isLoaded ? this.renderData() : this.renderLoading();
 *  }
 *}
 *
 * const styles = StyleSheet.create({
 *  loading: {
 *    flex: 1,
 *    justifyContent: 'center',
 *    alignItems: 'center',
 *  },
 *});
 *```
 *
 * @example Size
 *
 * ```
 * import React from 'react';
 * import { Spinner } from 'react-native-ui-kitten';
 *
 * export const GiantSpinner = () => (
 *  <Spinner size='giant'/>
 * );
 * ```
 *
 * @example Status
 *
 * ```
 * import React from 'react';
 * import { Spinner } from 'react-native-ui-kitten';
 *
 * export const DangerSpinner = () => (
 *  <Spinner status='danger'/>
 * );
 * ```
 */
export class SpinnerComponent extends React.PureComponent<SpinnerProps> {

  static styledComponentName: string = 'Spinner';

  static defaultProps: Partial<SpinnerProps> = {
    animating: true,
  };

  private animation: SpinnerAnimation = new SpinnerAnimation(this.containerSize.height);

  private get containerSize(): Size {
    const { width, height } = StyleSheet.flatten([this.props.themedStyle, this.props.style]);
    // @ts-ignore: width and height are restricted to be a number
    return new Size(width, height);
  }

  public componentDidMount() {
    if (this.props.animating) {
      this.startAnimation();
    }
  }

  public componentDidUpdate(prevProps: SpinnerProps) {
    const animatingChanged: boolean = this.props.animating !== prevProps.animating;

    if (animatingChanged && this.props.animating) {
      this.startAnimation();
    }

    if (animatingChanged && !this.props.animating) {
      this.stopAnimation();
    }
  }

  public componentWillUnmount() {
    this.animation.release();
  }

  private startAnimation = () => {
    this.animation.start();
  };

  private stopAnimation = () => {
    this.animation.stop();
  };

  private getComponentStyle = (source: SpinnerAnimationStyle) => {
    const start: ArcElementStyle = {
      container: source.container,
      arc: source.start,
    };

    const end: ArcElementStyle = {
      container: source.container,
      arc: source.end,
      overflow: { top: this.containerSize.height / 2 },
    };

    return { start, end };
  };

  private renderArcElement = (style: ArcElementStyle, size: Size): React.ReactElement<ViewProps> => {
    const arcSize: Size = new Size(size.width, size.height / 2);

    return (
      <Animated.View style={[style.container, styles.absolute, size]}>
        <View style={[styles.noOverflow, style.overflow, arcSize]}>
          <Animated.View style={[style.arc, size]}>
            <View style={[styles.noOverflow, arcSize]}>
              <View style={[this.props.themedStyle, this.props.style]}/>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const containerSize: Size = this.containerSize;
    const { start, end } = this.getComponentStyle(this.animation.toProps());

    return (
      <View style={containerSize}>
        {this.renderArcElement(start, containerSize)}
        {this.renderArcElement(end, containerSize)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absolute: StyleSheet.absoluteFillObject,
  noOverflow: {
    overflow: 'hidden',
  },
});

export const Spinner = styled<SpinnerProps>(SpinnerComponent);
