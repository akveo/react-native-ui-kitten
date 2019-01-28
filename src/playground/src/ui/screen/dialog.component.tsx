import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  ModalService,
  ModalAnimationType,
} from '@kitten/theme';
import { NavigationScreenProps } from 'react-navigation';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Dialog extends React.Component<Props> {

  static navigationOptions = {
    title: 'Modal',
  };

  createModal = (): React.ReactElement<any> => (
    <TestModal onCloseModal={() => ModalService.hideModal()}/>
  );

  showModal = (): void => {
    const component = this.createModal();
    ModalService.showDialog(component, false, ModalAnimationType.slide);
  };

  render() {
    return (
      <View>
        <Button
          onPress={this.showModal}
          title='Show Modal'
        />
      </View>
    );
  }

}

export const DialogScreen = withStyles(Dialog, (theme: ThemeType) => ({}));

interface TestModalProps {
  onCloseModal: () => void;
}

class TestModal extends React.Component<TestModalProps> {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is test Modal</Text>
        <Button
          title='Close Modal'
          onPress={this.props.onCloseModal}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
