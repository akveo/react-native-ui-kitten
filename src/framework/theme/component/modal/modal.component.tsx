import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  component: JSX.Element | null;
  isBackDropAllowed: boolean;
  onBackdrop: () => void;
}

export class ModalComponent extends React.Component<ModalComponentProps> {

  renderBackground(): React.ReactNode {
    return <View style={styles.background}/>;
  }

  renderComponent(): React.ReactNode {
    return this.props.isBackDropAllowed ?
      (
        <TouchableWithoutFeedback onPress={this.props.onBackdrop}>
          <View style={styles.componentContainer}>
            {this.props.component}
          </View>
        </TouchableWithoutFeedback>
      ) :
      (
        <View style={styles.componentContainer}>
          {this.props.component}
        </View>
      );
  }

  render(): React.ReactNode {
    return (
      <Modal
        animationType='fade'
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
