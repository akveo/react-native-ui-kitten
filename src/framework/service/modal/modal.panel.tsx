import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  findNodeHandle,
} from 'react-native';
import { ModalService } from './modal.service';

interface ModalPanelProps {
  children: any;
}

interface ModalPanelState {
  dialogComponent: React.Component;
  modalVisible: boolean;
  viewRef: any; // todo: check if needed
  closeOnBackDrop: boolean;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> {

  ref: any; // todo: add type
  state: ModalPanelState = {
    dialogComponent: null,
    modalVisible: false,
    viewRef: null,
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

  onLayout(): void {
    if (Platform.OS !== 'ios') {
      this.setState({ viewRef: findNodeHandle(this.ref) });
    }
  }

  showDialog(dialogComponent: any, closeOnBackDrop: boolean): void {
    this.setState({
      dialogComponent: dialogComponent,
      modalVisible: true,
      closeOnBackDrop: closeOnBackDrop,
    });
  }

  onBackDrop(): void {
    if (this.state.closeOnBackDrop) {
      this.setModalVisible(false);
    }
  }

  render(): React.ReactNode {
    // todo: add modal component to render
    return (
      <View
        style={styles.container}
        pointerEvents='box-none'
        ref={(component: any) => this.ref = component}
        onLayout={() => this.onLayout()}
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
