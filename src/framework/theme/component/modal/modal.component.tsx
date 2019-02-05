import React from 'react';
import {
  View,
  ViewProps,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  component: React.ReactElement<any>;
  isBackDropAllowed: boolean;
  identifier: string;
  onCloseModal: (index: string) => void;
}

export type Props = ViewProps & ModalProps;

interface ModalState {
  isVisible: boolean;
}

export class Modal extends React.Component<Props, ModalState> {

  static defaultProps: Partial<Props> = {
    visible: false,
    isBackDropAllowed: false,
  };

  state: ModalState = {
    isVisible: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = { isVisible: props.visible };
  }

  private closeModal: () => void = (): void => {
    this.props.onCloseModal && this.props.onCloseModal(this.props.identifier);
  };

  private closeOnBackDrop: () => void = () => {
    if (this.props.isBackDropAllowed) {
      this.closeModal();
    }
  };

  private renderChild(): React.ReactElement<ViewProps> {
    const { component } = this.props;
    const componentWithCloseProps = React.Children
      .map(component, (child: React.ReactElement<any>) =>
        React.cloneElement(child, {
            onCloseModal: this.closeModal,
          },
        ));
    return (
      <View {...this.props} style={[styles.componentContainer, this.props.style]}>
        {componentWithCloseProps}
      </View>
    );
  }

  private renderComponent(): React.ReactElement<ViewProps | TouchableWithoutFeedbackProps> {
    return this.props.isBackDropAllowed ?
      (
        <TouchableWithoutFeedback onPress={this.closeOnBackDrop}>
          {this.renderChild()}
        </TouchableWithoutFeedback>
      ) : this.renderChild();
  }

  render(): React.ReactElement<ViewProps | TouchableWithoutFeedbackProps> {
    return this.state.isVisible ? this.renderComponent() : null;
  }

}

const styles = StyleSheet.create({
  componentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
