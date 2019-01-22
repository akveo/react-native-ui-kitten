import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../service';

interface ModalPanelProps {
  children: JSX.Element;
}

interface ModalPanelState {
  dialogComponent: JSX.Element | null;
  modalVisible: boolean;
  closeOnBackDrop: boolean;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> {

  state: ModalPanelState = {
    dialogComponent: null,
    modalVisible: false,
    closeOnBackDrop: false,
  };

  componentDidMount(): void {
    ModalService.setComponent(this);
  }

  componentWillUnmount(): void {
    ModalService.setComponent(null);
  }

  setModalVisible(isVisible: boolean): void {
    this.setState({ modalVisible: isVisible });
  }

  showDialog(dialogComponent: JSX.Element | null, closeOnBackDrop: boolean): void {
    this.setState({
      dialogComponent: dialogComponent,
      modalVisible: true,
      closeOnBackDrop: closeOnBackDrop,
    });
  }

  onBackDrop = (): void => {
    if (this.state.closeOnBackDrop) {
      this.setModalVisible(false);
    }
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        {this.props.children}
        {this.state.dialogComponent &&
        <ModalComponent
          visible={this.state.modalVisible}
          component={this.state.dialogComponent}
          isBackDropAllowed={this.state.closeOnBackDrop}
          onBackdrop={this.onBackDrop}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
