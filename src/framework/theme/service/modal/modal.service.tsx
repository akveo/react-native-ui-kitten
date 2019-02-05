import React from 'react';
import { ModalPanel } from '../../component';

class ModalServiceType {

  component: ModalPanel | null = null;

  setComponent(component: ModalPanel | null): void {
    this.component = component;
  }

  showDialog(dialogComponent: React.ReactElement<any>, closeOnBackDrop: boolean = false): void {
    if (this.component) {
      this.component.showDialog(dialogComponent, closeOnBackDrop);
    }
  }
}

export const ModalService = new ModalServiceType();
