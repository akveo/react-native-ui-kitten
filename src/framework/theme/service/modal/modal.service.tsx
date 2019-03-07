import React from 'react';
import { ModalComponentCloseProps } from '@kitten/theme';

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

export interface ModalPresenting {
  show(element: React.ReactElement<ModalComponentCloseProps>,
       closeOnBackDrop: boolean): string;

  hide(identifier: string): void;
}

export const ModalService = new ModalServiceType();
