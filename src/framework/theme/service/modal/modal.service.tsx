import { ModalPanel } from '../../component';

class ModalServiceType {

  component: ModalPanel | null = null;

  setComponent(component: ModalPanel | null) {
    this.component = component;
  }

  showDialog(dialogComponent: JSX.Element, closeOnBackDrop: boolean = false) {
    if (this.component) {
      this.component.showDialog(dialogComponent, closeOnBackDrop);
    }
  }

  hideModal() {
    this.component.setModalVisible(false);
  }
}

export const ModalService = new ModalServiceType();
