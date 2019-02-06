import React from 'react';
import { ModalPanel } from '../../component';

export type ModalAnimationType = 'slideInUp' | 'fade' | 'none';

export interface ModalAnimationConfig {
  animationType: ModalAnimationType;
  animationDuration: number;
}

class ModalServiceType {

  component: ModalPanel | null = null;

  public setComponent(component: ModalPanel | null): void {
    this.component = component;
  }

  public showDialog(dialogComponent: React.ReactElement<any>,
                    closeOnBackDrop: boolean = false,
                    animationConfig?: ModalAnimationConfig): void {
    if (this.component) {
      this.component.showDialog(dialogComponent, closeOnBackDrop, animationConfig);
    }
  }
}

export const ModalService = new ModalServiceType();
