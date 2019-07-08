/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { ModalResolver } from './modalResolver.component';
import {
  ModalService,
  ModalPresenting,
  ModalPresentingConfig,
} from './modal.service';

export interface ModalPanelProps {
  children: React.ReactNode;
}

interface ModalPanelState {
  components: Map<string, ModalPresentingConfig>;
}

export class ModalPanel extends React.Component<ModalPanelProps, ModalPanelState> implements ModalPresenting {

  public state: ModalPanelState = {
    components: new Map(),
  };

  public componentDidMount(): void {
    ModalService.mount(this);
  }

  public componentWillUnmount(): void {
    ModalService.unmount();
  }

  public hide = (identifier: string): void => {
    const components: Map<string, ModalPresentingConfig> = this.state.components;
    components.delete(identifier);
    this.setState({ components });
  };

  public show(config: ModalPresentingConfig): string {
    const key: string = this.generateUniqueComponentKey();
    const components: Map<string, ModalPresentingConfig> = this.state.components
      .set(key, config);
    this.setState({ components });
    return key;
  }

  private generateUniqueComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  private areThereAnyComponents(): boolean {
    return this.state.components && this.state.components.size !== 0;
  }

  private renderModal(config: ModalPresentingConfig, index: number) {
    return (
      <ModalResolver
        {...config.element.props}
        visible={true}
        key={index}
        allowBackdrop={config.allowBackdrop}
        onBackdropPress={config.onBackdropPress}>
        {config.element}
      </ModalResolver>
    );
  }

  private renderModals() {
    return Array.from(this.state.components.values()).map(this.renderModal);
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
