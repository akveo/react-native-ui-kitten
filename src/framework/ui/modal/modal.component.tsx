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

export interface ModalAnimationConfig {
  animationType: ModalAnimationType;
  animationDuration: number;
}

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
    if (nextProps.visible !== this.props.visible) {
      if (this.hasAnimation()) {
        const initialValue: number = this.props.animationType === 'fade' ? 0 : height;
        this.animation.setValue(initialValue);
        this.startAnimation();
      }
    }
  }

  private hasAnimation(): boolean {
    return this.props.animationType !== 'none';
  }

  private startAnimation(): void {
    const value: number = this.props.animationType === 'fade' ? 1 : 0;
    Animated.timing(
      this.animation,
      {
        toValue: value,
        duration: this.props.animationDuration,
      },
    ).start();
  }

  private setAnimation(): void {
    if (this.props.animationType === 'slideInUp') {
      this.animation = new Animated.Value(height);
    } else {
      this.animation = new Animated.Value(0);
    }
  }

  private getComponentStyle = (style: StyleType): StyleType | null => ({
    container: style ? {
      paddingHorizontal: style.paddingHorizontal,
      paddingVertical: style.paddingVertical,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderRadius: style.borderRadius,
      borderWidth: style.borderWidth,
    } : null,
  });

  private closeModal: () => void = (): void => {
    this.props.onCloseModal && this.props.onCloseModal(this.props.identifier);
  };

  private closeOnBackDrop: () => void = () => {
    if (this.props.isBackDropAllowed) {
      this.closeModal();
    }
  };

  private renderBackdrop(): React.ReactElement<TouchableWithoutFeedbackProps> {
    return this.props.isBackDropAllowed ? (
      <TouchableWithoutFeedback onPress={this.closeOnBackDrop}>
        <View style={styles.backdrop}/>
      </TouchableWithoutFeedback>
    ) : null;
  }

  private getAnimationStyle(): StyleType | undefined {
    if (this.hasAnimation()) {
      return this.props.animationType === 'fade' ?
        { opacity: this.animation } :
        { transform: [{ translateY: this.animation }] };
    }
  }

  private renderComponent(): React.ReactElement<ViewProps> {
    const { children } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const childrenWithCloseProps: React.ReactElement<any>[] = React.Children
      .map(children, (child: React.ReactElement<any>) =>
        React.cloneElement(child, {
            onCloseModal: this.closeModal,
            pointerEvents: 'box-none',
          },
        ));
    const animationStyle: StyleType = this.getAnimationStyle();

    return (
      <View style={styles.container}>
        {this.renderBackdrop()}
        <Animated.View
          {...this.props}
          style={[componentStyle.container, this.props.style, animationStyle]}
        >
          {childrenWithCloseProps}
        </Animated.View>
      </View>
    );
  }

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
