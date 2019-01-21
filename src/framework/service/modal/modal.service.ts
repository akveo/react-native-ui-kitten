// todo: add types
class ModalServiceType {

  component: any = null;

  setComponent(component: any) {
    this.component = component;
  }

  showDialog(dialogComponent: any, closeOnBackDrop: boolean = false) {
    if (this.component) {
      this.component.showDialog(dialogComponent, closeOnBackDrop);
    }
  }

  hideModal() {
    this.component.setModalVisible(false);
  }
}

export const ModalService = new ModalServiceType();
