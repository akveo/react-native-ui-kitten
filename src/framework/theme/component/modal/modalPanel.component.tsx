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
  components: Map<string, React.ReactElement<ModalComponentCloseProps>>;
  backdrops: Map<string, boolean>;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> implements ModalPresenting {

  public state: ModalPanelState = {
    components: new Map(),
    backdrops: new Map(),
  };

  public componentDidMount(): void {
    ModalService.mount(this);
  }

  public componentWillUnmount(): void {
    ModalService.unmount();
  }

  public hide = (identifier: string): void => {
    const component: React.ReactElement<ModalComponentCloseProps> = this.state.components
      .get(identifier);
    if (component) {
      component.props.onRequestClose && component.props.onRequestClose();
    }
    const components: Map<string, React.ReactElement<any>> = this.state.components;
    components.delete(identifier);
    const backdrops: Map<string, boolean> = this.state.backdrops;
    backdrops.delete(identifier);
    this.setState({
      components: components,
      backdrops: backdrops,
    });
  };

  public show(dialogComponent: React.ReactElement<any>, closeOnBackDrop: boolean): string {
    const key: string = this.generateUniqueComponentKey();
    const componentsMap: Map<string, React.ReactElement<any>> = this.state.components
      .set(key, dialogComponent);
    const backdrops: Map<string, boolean> = this.state.backdrops.set(key, closeOnBackDrop);
    this.setState({
      components: componentsMap,
      backdrops: backdrops,
    });
    return key;
  }

  private generateUniqueComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  private areThereAnyComponents(): boolean {
    return this.state.components && this.state.components.size !== 0;
  }

  private renderModal(modal: React.ReactElement<any>, index: number) {
    const allModalKeys: string[] = Array.from(this.state.components.keys());
    const identifier: string = allModalKeys
      .find(item => this.state.components.get(item) === modal);
    const closeOnBackdrop: boolean = this.state.backdrops.get(identifier);
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
    return Array.from(this.state.components.values())
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
