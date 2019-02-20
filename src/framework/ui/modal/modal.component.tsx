import React from 'react';
import {
  View,
  ViewProps,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
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

  private getComponentStyle = (style: StyleType): StyleType | null => {
    return {
      container: style ? {
        paddingHorizontal: style.paddingHorizontal,
        paddingVertical: style.paddingVertical,
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius,
        borderWidth: style.borderWidth,
      } : null,
    };
  };

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

  private createComponentChild = (source: React.ReactElement<any>): React.ReactElement<any> => {
    return React.cloneElement(source, {
      onCloseModal: this.closeModal,
      pointerEvents: 'box-none',
    });
  };

  private createBackdropElement = (): React.ReactElement<TouchableWithoutFeedbackProps> => {
    return this.props.isBackDropAllowed ? (
      <TouchableWithoutFeedback onPress={this.closeOnBackdrop}>
        <View style={styles.backdrop}/>
      </TouchableWithoutFeedback>
    ) : null;
  };

  private createComponentChildren = (source: React.ReactNode): React.ReactElement<any>[] => {
    return React.Children.map(source, this.createComponentChild);
  };

  private renderComponent = (): React.ReactElement<ViewProps> => {
    const { style, themedStyle, animationType, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const animationStyle: StyleType = this.getAnimationStyle(animationType);

    const backdropElement: React.ReactElement<any> = this.createBackdropElement();
    const componentChildren: React.ReactElement<any>[] = this.createComponentChildren(children);

    return (
      <View style={styles.container}>
        {backdropElement}
        <Animated.View
          {...derivedProps}
          style={[componentStyle.container, style, animationStyle]}>
          {componentChildren}
        </Animated.View>
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps | TouchableWithoutFeedbackProps> {
    return this.props.visible ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  backdrop: {
    width: width,
    height: height,
    ...StyleSheet.absoluteFillObject,
  },
});
