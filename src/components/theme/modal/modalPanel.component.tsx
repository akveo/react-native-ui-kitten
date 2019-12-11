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
import {
  ModalResolver,
  ModalResolverProps,
} from './modalResolver.component';
import {
  ModalService,
  ModalPresenting,
  ModalPresentingConfig,
} from './modal.service';

interface ModalPanelChild extends ModalPresentingConfig {
  element: React.ReactElement;
}

export interface ModalPanelProps {
  children: React.ReactNode;
}

interface ModalPanelState {
  components: Map<string, ModalPanelChild>;
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

  public hide = (identifier: string): string => {
    const components: Map<string, ModalPanelChild> = this.state.components;
    components.delete(identifier);
    this.setState({ components });
    return '';
  };

  public show(element: React.ReactElement, config: ModalPresentingConfig): string {
    const key: string = this.generateUniqueComponentKey();
    const components: Map<string, ModalPanelChild> = this.state.components
      .set(key, { ...config, element });

    this.setState({ components });

    return key;
  }

  public update(identifier: string, children: React.ReactNode): void {
    const panelChild: ModalPanelChild = this.state.components.get(identifier);

    if (!panelChild) {
      return;
    }

    const childElement: React.ReactElement = panelChild.element;

    panelChild.element = React.cloneElement(childElement, {
      children: children,
    });

    const components: Map<string, ModalPanelChild> = this.state.components;
    components.delete(identifier);
    components.set(identifier, panelChild);
    this.setState({ components });
  }

  private generateUniqueComponentKey = (): string => {
    return Math.random().toString(36).substring(2);
  };

  private areThereAnyComponents = (): boolean => {
    return this.state.components && this.state.components.size !== 0;
  };

  private renderModal = (config: ModalPanelChild, index: number): React.ReactElement<ModalResolverProps> => {
    return (
      <ModalResolver
        {...config.element.props}
        style={config.backdropStyle}
        visible={true}
        key={index}
        allowBackdrop={config.allowBackdrop}
        onBackdropPress={config.onBackdropPress}>
        {config.element}
      </ModalResolver>
    );
  };

  private renderModals = (): React.ReactElement<ModalResolverProps>[] => {
    return Array.from(this.state.components.values()).map(this.renderModal);
  };

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
