import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

export type ModalAnimationType = 'slideInUp' | 'fade' | 'none';

interface ModalProps {
  visible: boolean;
  children: React.ReactElement<any> | React.ReactElement<any>[];
  isBackDropAllowed?: boolean;
  identifier?: string;
  animationType?: ModalAnimationType;
  animationDuration?: number;
  onCloseModal?: (index: string) => void;
}

const { width, height } = Dimensions.get('window');

export type Props = StyledComponentProps & ViewProps & ModalProps;

export class Modal extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    visible: false,
    isBackDropAllowed: false,
    animationType: 'none',
    animationDuration: 300,
  };

  private animation: Animated.Value;

  constructor(props: Props) {
    super(props);

    this.setAnimation();
  }

  public componentDidMount(): void {
    this.startAnimation();
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>): void {
    const { visible, animationType } = this.props;

    const isVisibilityChanged: boolean = nextProps.visible !== visible;
    const isAnimated: boolean = animationType !== 'none';

    if (isVisibilityChanged && isAnimated) {
      const initialValue: number = animationType === 'fade' ? 0 : height;
      this.animation.setValue(initialValue);
      this.startAnimation();
    }
  }

  private getAnimationStyle(type: ModalAnimationType): StyleType | undefined {
    switch (type) {
      case 'none':
        return {};
      case 'fade':
        return { opacity: this.animation };
      default:
        return { transform: [{ translateY: this.animation }] };
    }
  }

  private setAnimation(): void {
    if (this.props.animationType === 'slideInUp') {
      this.animation = new Animated.Value(height);
    } else {
      this.animation = new Animated.Value(0);
    }
  }

  private startAnimation(): void {
    const { animationType, animationDuration } = this.props;
    const animationValue: number = animationType === 'fade' ? 1 : 0;

    Animated.timing(this.animation, {
      toValue: animationValue,
      duration: animationDuration,
    }).start();
  }

  private closeModal: () => void = (): void => {
    if (this.props.onCloseModal) {
      this.props.onCloseModal(this.props.identifier);
    }
  };

  private closeOnBackdrop: () => void = () => {
    if (this.props.isBackDropAllowed) {
      this.closeModal();
    }
  };

  private onStartShouldSetResponder = (): boolean => true;

  private onResponderRelease = (): void => { return; };

  private onStartShouldSetResponderCapture = (): boolean => false;

  private renderComponentChild = (source: React.ReactElement<any>): React.ReactElement<any> => {
    return React.cloneElement(source, {
      ...source.props,
      onCloseModal: this.closeModal,
      style: {
        ...source.props.style,
        ...StyleSheet.flatten(this.props.style),
      },
    });
  };

  private renderComponentChildren = (source: React.ReactNode): React.ReactElement<any>[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  private renderWithBackDrop = (component: React.ReactElement<ViewProps>) => (
    <TouchableOpacity
      style={styles.container}
      onPress={this.closeOnBackdrop}
      activeOpacity={1}>
      {component}
    </TouchableOpacity>
  );

  private renderWithoutBackDrop = (component: React.ReactElement<ViewProps>) => (
    <View style={styles.notVisibleWrapper}>
      <View
        style={styles.container}
        pointerEvents='none'/>
      {component}
    </View>
  );

  private renderComponent = (): React.ReactElement<TouchableOpacityProps | ViewProps> => {
    const { animationType, children, isBackDropAllowed, ...derivedProps } = this.props;
    const animationStyle: StyleType = this.getAnimationStyle(animationType);
    const componentChildren: React.ReactElement<any>[] = this.renderComponentChildren(children);

    const dialog: React.ReactElement<ViewProps> =
      <Animated.View
        {...derivedProps}
        style={[animationStyle, styles.animatedWrapper]}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
        onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}
        pointerEvents='box-none'>
        {componentChildren}
      </Animated.View>;

    return isBackDropAllowed ?
      this.renderWithBackDrop(dialog) : this.renderWithoutBackDrop(dialog);
  };

  public render(): React.ReactElement<ViewProps | TouchableOpacityProps> | null {
    return this.props.visible ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  notVisibleWrapper: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  animatedWrapper: {
    alignSelf: 'flex-start',
  },
});
