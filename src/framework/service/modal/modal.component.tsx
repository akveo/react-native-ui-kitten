import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  component: any;
  backgroundRef: any;
  isBackDropAllowed: boolean;
  onBackdrop: () => void;
}

export class ModalComponent extends React.Component<ModalComponentProps> {

  renderBackground(): React.ReactNode {
    return (
      <View style={styles.background} />
    );
  }

  onBackDrop = (): void => {
    if (this.props.isBackDropAllowed) {
      this.props.onBackdrop();
    }
  };

  render(): React.ReactNode {
    const { component, visible } = this.props;

    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
      >
        {this.renderBackground()}
        <TouchableOpacity
          style={styles.componentContainer}
          onPress={this.onBackDrop}
        >
          {component}
        </TouchableOpacity>
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
