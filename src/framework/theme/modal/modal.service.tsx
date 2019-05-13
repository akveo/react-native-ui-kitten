/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';

/**
 * The `ModalService` singleton service than has 2 methods (show/hide).
 * This service takes React.ReactElement<ModalComponentCloseProps> and
 * pushes it to the DialogPanel.
 *
 * @type ModalServiceType
 *
 * @method {(element: React.ReactElement<ModalComponentCloseProps>,
 * closeOnBackDrop: boolean = false) => string} show - Takes component, returns it's identifier.
 *
 * @method {(identifier: string) => void} hide - Hide dialog component with
 * this identifier and removes it from Modal Panel.
 *
 * @example Usage example
 *
 * ```
 * import { ModalService } from '@kitten/theme';
 *
 * private identifier: string = '';
 *
 * private show = (): void => {
 *   const component: React.ReactElement<ModalComponentCloseProps> =
 *     <View onRequestClose={() => Alert.alert('Dialog close')}>
 *       <Text>Hi! I'm modal in modal panel!</Text>
 *     </View>;
 *   this.identifier = ModalService.show(component);
 * };
 *
 * private hide = (): void => {
 *   ModalService.hide(this.identifier);
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <View>
 *       <Button title='Show Modal' onPress={this.show}/>
 *       <Button title='Hide Modal' onPress={this.hide}/>
 *     </View>
 *   )
 * }
 * ```
 * */

class ModalServiceType {

  panel: ModalPresenting | null = null;

  public mount(panel: ModalPresenting | null): void {
    this.panel = panel;
  }

  public unmount(): void {
    this.panel = null;
  }

  public show(element: React.ReactElement<ModalComponentCloseProps>,
              closeOnBackDrop: boolean = false): string {
    if (this.panel) {
      return this.panel.show(element, closeOnBackDrop);
    }
  }

  public hide(identifier: string): void {
    if (this.panel) {
      this.panel.hide(identifier);
    }
  }
}

export interface ModalComponentCloseProps {
  [key: string]: any;
  onRequestClose: () => void;
}

export interface ModalPresenting {
  show(element: React.ReactElement<ModalComponentCloseProps>,
       closeOnBackDrop: boolean): string;

  hide(identifier: string): void;
}

export const ModalService = new ModalServiceType();
