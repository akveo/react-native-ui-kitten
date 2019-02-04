import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { Modal } from './modal.component';
import { ModalService } from '../../service';

export interface ModalPanelProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

interface ModalPanelState {
  dialogComponents: Map<string, React.ReactElement<any>>;
  closeOnBackDropAllowed: boolean;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> {

  state: ModalPanelState = {
    dialogComponents: new Map(),
    closeOnBackDropAllowed: false,
  };

  componentDidMount(): void {
    ModalService.setComponent(this);
  }

  componentWillUnmount(): void {
    ModalService.setComponent(null);
  }

  private generateUniqComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  showDialog(dialogComponent: React.ReactElement<any>, closeOnBackDrop: boolean): void {
    const map: Map<string, React.ReactElement<any>> = this.state.dialogComponents
      .set(this.generateUniqComponentKey(), dialogComponent);
    this.setState({
      dialogComponents: map,
      closeOnBackDropAllowed: closeOnBackDrop,
    });
  }

  private areThereAnyComponents(): boolean {
    return this.state.dialogComponents && this.state.dialogComponents.size !== 0;
  }

  onCloseModal = (identifier: string) => {
    const components: Map<string, React.ReactElement<any>> = this.state.dialogComponents;
    components.delete(identifier);
    this.setState({ dialogComponents: components });
  };

  renderModal(modal: React.ReactElement<any>, index: number) {
    const allModalKeys: string[] = Array.from(this.state.dialogComponents.keys());
    const identifier: string = allModalKeys
      .find(item => this.state.dialogComponents.get(item) === modal);
    return (
      <Modal
        visible={true}
        component={modal}
        isBackDropAllowed={this.state.closeOnBackDropAllowed}
        key={index}
        identifier={identifier}
        onCloseModal={this.onCloseModal}
      />
    );
  }

  renderModals() {
    return Array.from(this.state.dialogComponents.values())
      .map((component: React.ReactElement<any>, i: number) =>
        this.renderModal(component, i));
  }

  render(): React.ReactElement<ViewProps> {
    return (
      <View style={styles.container}>
        {this.props.children}
        {this.areThereAnyComponents() && this.renderModals()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
