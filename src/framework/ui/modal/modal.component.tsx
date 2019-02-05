import React from 'react';
import {
  View,
  ViewProps,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ModalProps {
  visible: boolean;
  children: React.ReactElement<any> | React.ReactElement<any>[];
  isBackDropAllowed?: boolean;
  identifier?: string;
  onCloseModal?: (index: string) => void;
}

export type Props = StyledComponentProps & ViewProps & ModalProps;

export class Modal extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    visible: false,
    isBackDropAllowed: false,
  };

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

  private renderComponent(): React.ReactElement<ViewProps> {
    const { children } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const childrenWithCloseProps = React.Children
      .map(children, (child: React.ReactElement<any>) =>
        React.cloneElement(child, {
            onCloseModal: this.closeModal,
            pointerEvents: 'box-none',
          },
        ));

    return (
      <View style={styles.container}>
        {this.renderBackdrop()}
        <View {...this.props} style={[componentStyle.container, this.props.style]}>
          {childrenWithCloseProps}
        </View>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ...StyleSheet.absoluteFillObject,
  },
});
