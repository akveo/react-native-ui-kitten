import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {
  ModalAnimationConfig,
  ModalService,
} from '../../service';
import { Modal } from '../../../ui/modal/modal.component';

export interface ModalPanelProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

interface ModalPanelState {
  dialogComponents: Map<string, React.ReactElement<any>>;
  closeOnBackDropAllowed: boolean;
  modalAnimationConfig: ModalAnimationConfig;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> {

  public state: ModalPanelState = {
    dialogComponents: new Map(),
    closeOnBackDropAllowed: false,
    modalAnimationConfig: {
      animationType: 'none',
      animationDuration: 0,
    },
  };

  public componentDidMount(): void {
    ModalService.setComponent(this);
  }

  public componentWillUnmount(): void {
    ModalService.setComponent(null);
  }

  public onCloseModal = (identifier: string) => {
    const components: Map<string, React.ReactElement<any>> = this.state.dialogComponents;
    components.delete(identifier);
    this.setState({
      dialogComponents: components,
      modalAnimationConfig: {
        animationType: 'none',
        animationDuration: 0,
      },
    });
  };

  public showDialog(dialogComponent: React.ReactElement<any>,
                    closeOnBackDrop: boolean,
                    animationConfig?: ModalAnimationConfig): void {
    const map: Map<string, React.ReactElement<any>> = this.state.dialogComponents
      .set(this.generateUniqComponentKey(), dialogComponent);
    const animConfig: ModalAnimationConfig = animationConfig ?
      animationConfig : this.state.modalAnimationConfig;
    this.setState({
      dialogComponents: map,
      closeOnBackDropAllowed: closeOnBackDrop,
      modalAnimationConfig: animConfig,
    });
  }

  private generateUniqComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  private areThereAnyComponents(): boolean {
    return this.state.dialogComponents && this.state.dialogComponents.size !== 0;
  }

  private renderModal(modal: React.ReactElement<any>, index: number) {
    const allModalKeys: string[] = Array.from(this.state.dialogComponents.keys());
    const identifier: string = allModalKeys
      .find(item => this.state.dialogComponents.get(item) === modal);
    return (
      <Modal
        visible={true}
        isBackDropAllowed={this.state.closeOnBackDropAllowed}
        key={index}
        identifier={identifier}
        animationType={this.state.modalAnimationConfig.animationType}
        animationDuration={this.state.modalAnimationConfig.animationDuration}
        onCloseModal={this.onCloseModal}
      >
        {modal}
      </Modal>
    );
  }

  private renderModals() {
    return Array.from(this.state.dialogComponents.values())
      .map((component: React.ReactElement<any>, i: number) =>
        this.renderModal(component, i));
  }

  public render(): React.ReactElement<ViewProps> {
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
