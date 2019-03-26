import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  ModalService,
  ModalComponentCloseProps,
} from '@kitten/theme';
import { NavigationScreenProps } from 'react-navigation';

type Props = & ThemedComponentProps & NavigationScreenProps;

class DialogScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Dialog',
  };

  private modalId: string | undefined = undefined;

  private createModal = (): React.ReactElement<any> => (
    <TestModal onRequestClose={() => Alert.alert('Dialog close')}/>
  );

  private showModal = (): void => {
    const component = this.createModal();
    this.modalId = ModalService.show(component, false);
  };

  private hideModal = () => {
    if (this.modalId) {
      ModalService.hide(this.modalId);
    }
  };

  render() {
    return (
      <View>
        <Button
          onPress={this.showModal}
          title='Show Modal'
        />
        <Button
          onPress={this.hideModal}
          title='Hide Modal'
        />
      </View>
    );
  }
}

class TestModal extends React.Component<ModalComponentCloseProps> {

  private createModal = (): React.ReactElement<any> => (
    <InnerTestModal onRequestClose={() => Alert.alert('Inner dialog close')}/>
  );

  private showModal = (): void => {
    const component = this.createModal();
    ModalService.show(component, true);
  };

  render() {
    return (
      <View style={styles.outerModal}>
        <Text>This is Test Outer Modal</Text>
        <Button
          title='Open Inner Modal'
          onPress={this.showModal}
        />
        <Button
          title='Close Modal'
          onPress={this.props.onCloseModal}
        />
      </View>
    );
  }
}

class InnerTestModal extends React.Component<ModalComponentCloseProps> {

  render(): React.ReactNode {
    return (
      <View style={styles.innerModal}>
        <Text>This is Test Inner Modal</Text>
        <Button
          title='Close Modal'
          onPress={this.props.onCloseModal}
        />
      </View>
    );
  }
}

export default withStyles(DialogScreen, (theme: ThemeType) => ({}));

const styles = StyleSheet.create({
  outerModal: {
    width: 300,
    height: 300,
    backgroundColor: '#d87d8f',
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
    left: 50,
  },
  innerModal: {
    width: 150,
    height: 150,
    backgroundColor: '#adbbd1',
    alignItems: 'center',
    justifyContent: 'center',
    top: 450,
    left: 100,
  },
});
