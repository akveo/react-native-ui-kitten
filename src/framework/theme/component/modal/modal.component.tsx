import React from 'react';
import {
  Modal,
  View,
  ViewProps,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { ModalAnimationType } from '../../type';

interface ModalComponentProps {
  visible: boolean;
  component: React.ReactElement<any> | React.ReactElement<any>[];
  isBackDropAllowed: boolean;
  animationType?: ModalAnimationType;
  onBackdrop: () => void;
}

export class ModalComponent extends React.Component<ModalComponentProps> {

  static defaultProps: Partial<ModalComponentProps> = {
    animationType: ModalAnimationType.fade,
  };

  renderBackground(): React.ReactElement<ViewProps> {
    return <View style={styles.background}/>;
  }

  renderChild(): React.ReactElement<ViewProps> {
    return (
      <View style={styles.componentContainer}>
        {this.props.component}
      </View>
    );
  }

  renderComponent(): React.ReactElement<ViewProps | TouchableWithoutFeedbackProps> {
    return this.props.isBackDropAllowed ?
      (
        <TouchableWithoutFeedback onPress={this.props.onBackdrop}>
          {this.renderChild()}
        </TouchableWithoutFeedback>
      ) : this.renderChild();
  }

  render(): React.ReactElement<any> {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={true}
        visible={this.props.visible}
      >
        {this.renderBackground()}
        {this.renderComponent()}
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'gray',
    opacity: 0.8,
  },
  componentContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
