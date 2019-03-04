import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import {
  ModalPresenting,
  ModalService,
} from '../../service';
import { Modal } from '../../../ui/modal/modal.component';
import { ModalComponentCloseProps } from '@kitten/theme';

export interface ModalPanelProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

interface ModalPanelState {
  dialogComponents: Map<string, React.ReactElement<ModalComponentCloseProps>>;
  backdropValues: Map<string, boolean>;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> implements ModalPresenting {

  public state: ModalPanelState = {
    dialogComponents: new Map(),
    backdropValues: new Map(),
  };

  public componentDidMount(): void {
    ModalService.mount(this);
  }

  public componentWillUnmount(): void {
    ModalService.unmount();
  }

  public hide = (identifier: string): void => {
    const component: React.ReactElement<ModalComponentCloseProps> = this.state.dialogComponents
      .get(identifier);
    if (component) {
      component.props.onRequestClose && component.props.onRequestClose();
    }
    const components: Map<string, React.ReactElement<any>> = this.state.dialogComponents;
    components.delete(identifier);
    const backdrops: Map<string, boolean> = this.state.backdropValues;
    backdrops.delete(identifier);
    this.setState({
      dialogComponents: components,
      backdropValues: backdrops,
    });
  };

  public show(dialogComponent: React.ReactElement<any>, closeOnBackDrop: boolean): string {
    const key: string = this.generateUniqueComponentKey();
    const componentsMap: Map<string, React.ReactElement<any>> = this.state.dialogComponents
      .set(key, dialogComponent);
    const backdrops: Map<string, boolean> = this.state.backdropValues
      .set(key, closeOnBackDrop);
    this.setState({
      dialogComponents: componentsMap,
      backdropValues: backdrops,
    });
    return key;
  }

  private generateUniqueComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  private areThereAnyComponents(): boolean {
    return this.state.dialogComponents && this.state.dialogComponents.size !== 0;
  }

  private renderModal(modal: React.ReactElement<any>, index: number) {
    const allModalKeys: string[] = Array.from(this.state.dialogComponents.keys());
    const identifier: string = allModalKeys
      .find(item => this.state.dialogComponents.get(item) === modal);
    const closeOnBackdrop: boolean = this.state.backdropValues.get(identifier);
    return (
      <Modal
        {...modal.props}
        visible={true}
        isBackDropAllowed={closeOnBackdrop}
        key={index}
        identifier={identifier}
        onCloseModal={this.hide}
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
