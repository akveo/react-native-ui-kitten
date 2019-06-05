import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Modal,
  Text,
} from '@kitten/ui';

type ModalShowcaseProps = & ThemedComponentProps & ViewProps;

interface State {
  modalVisible: boolean;
}

class ModalShowcaseComponent extends React.Component<ModalShowcaseProps, State> {

  public state: State = {
    modalVisible: false,
  };

  private toggleModal = () => {
    const modalVisible: boolean = !this.state.modalVisible;

    this.setState({ modalVisible });
  };

  public render(): React.ReactElement<ViewProps> {
    return (
      <View style={this.props.themedStyle.container}>
        <Button onPress={this.toggleModal}>
          SHOW MODAL
        </Button>
        <Modal
          style={this.props.themedStyle.modal}
          identifier='@modal/test'
          isBackDropAllowed={true}
          visible={this.state.modalVisible}
          onCloseModal={this.toggleModal}>
          <Text>Hi! I'm a Modal</Text>
        </Modal>
      </View>
    );
  }
}

export const ModalShowcase = withStyles(ModalShowcaseComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    height: 256,
    backgroundColor: theme['background-basic-color-1'],
    borderColor: theme['border-basic-color-2'],
    borderWidth: 1,
  },
}));
