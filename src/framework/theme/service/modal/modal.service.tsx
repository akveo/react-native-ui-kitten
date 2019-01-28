import {
  ModalPanel,
} from '../../component';
import React from 'react';
import { ModalAnimationType } from '../../type';

class ModalServiceType {

  component: ModalPanel | null = null;

  setComponent(component: ModalPanel | null): void {
    this.component = component;
  }

  showDialog(dialogComponent: React.ReactElement<any> | React.ReactElement<any>[] | null,
             closeOnBackDrop: boolean = false,
             animationType: ModalAnimationType = ModalAnimationType.fade): void {
    if (this.component) {
      this.component.showDialog(dialogComponent, closeOnBackDrop, animationType);
    }
  }

  hideModal(): void {
    this.component.setModalVisible(false);
  }
}

export const ModalService = new ModalServiceType();
