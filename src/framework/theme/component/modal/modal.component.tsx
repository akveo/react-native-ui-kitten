import React from 'react';
import {
  View,
  ViewProps,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  component: React.ReactElement<any>;
  isBackDropAllowed: boolean;
  identifier: string;
  onCloseModal: (index: string) => void;
}

interface ModalComponentState {
  isVisible: boolean;
}

export class ModalComponent extends React.Component<ModalComponentProps, ModalComponentState> {

  static defaultProps: Partial<ModalComponentProps> = {
    visible: false,
    isBackDropAllowed: false,
  };

  state: ModalComponentState = {
    isVisible: false,
  };

  constructor(props: ModalComponentProps) {
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
      <View style={styles.componentContainer}>
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
