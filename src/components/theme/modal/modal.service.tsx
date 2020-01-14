/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  ViewStyle,
} from 'react-native';

/**
 * Singleton service designed to manage modal components.
 *
 * @type ModalServiceType
 *
 * @method {(element: React.ReactElement<ModalPresentingBased>, config: ModalPresentingConfig) => string} show -
 * Shows component in a modal window. Returns its id.
 *
 * @method {(identifier: string) => string} hide - Hides component from a modal window and returns empty string.
 *
 * @method {(identifier: string, children: React.ReactNode) => void} update - Updates component from a modal window.
 *
 * @example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Layout, Button, Text, ModalService } from '@ui-kitten/components';
 *
 * export const ModalServiceShowcase = () => {
 *
 *   const modalID = '';
 *
 *   const showModal = () => {
 *     const contentElement = this.renderModalContentElement();
 *     this.modalID = ModalService.show(contentElement, { onBackdropPress: this.hideModal });
 *   };
 *
 *   const hideModal = () => {
 *     ModalService.hide(this.modalID);
 *   };
 *
 *   const renderModalContentElement = () => {
 *     return (
 *       <Layout>
 *         <Text>Hi, I'm modal!</Text>
 *       </Layout>
 *     );
 *   };
 *
 *   return (
 *     <Layout>
 *       <Button onPress={showModal}>SHOW MODAL</Button>
 *       <Button onPress={hideModal}>HIDE MODAL</Button>
 *     </Layout>
 *   );
 * }
 * ```
 */
class ModalServiceType {

  panel: ModalPresenting | null = null;

  public mount(panel: ModalPresenting | null): void {
    this.panel = panel;
  }

  public unmount(): void {
    this.panel = null;
  }

  public show(element: React.ReactElement, config: ModalPresentingConfig): string {
    if (this.panel) {
      return this.panel.show(element, config);
    }
  }

  public update(identifier: string, children: React.ReactElement): void {
    if (this.panel) {
      this.panel.update(identifier, children);
    }
  }

  public hide(identifier: string): string {
    if (this.panel) {
      return this.panel.hide(identifier);
    }
  }
}

export interface ModalPresentingConfig {
  backdropStyle?: StyleProp<ViewStyle>;
  onBackdropPress?: () => void;
}

export interface ModalPresenting {
  show(element: React.ReactElement, config: ModalPresentingConfig): string;

  hide(identifier: string): string;

  update(identifier: string, children: React.ReactElement): void;
}

export const ModalService = new ModalServiceType();
