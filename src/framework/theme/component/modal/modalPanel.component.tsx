import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../service';
import { ModalAnimationType } from '../../type';

export interface ModalPanelProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

interface ModalPanelState {
  dialogComponent: React.ReactElement<any> | React.ReactElement<any>[] | null;
  modalVisible: boolean;
  closeOnBackDrop: boolean;
  animationType: ModalAnimationType;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> {

  state: ModalPanelState = {
    dialogComponent: null,
    modalVisible: false,
    closeOnBackDrop: false,
    animationType: ModalAnimationType.fade,
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

  showDialog(dialogComponent: React.ReactElement<any> | React.ReactElement<any>[] | null,
             closeOnBackDrop: boolean,
             animationType: ModalAnimationType): void {
    this.setState({
      dialogComponent: dialogComponent,
      modalVisible: true,
      closeOnBackDrop: closeOnBackDrop,
      animationType: animationType,
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
          animationType={this.state.animationType}
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
