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
  ModalComponentCloseProps,
} from '@kitten/theme';
import { NavigationScreenProps } from 'react-navigation';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Dialog extends React.Component<Props> {

  static navigationOptions = {
    title: 'Modal',
  };

  private createModal = (): React.ReactElement<any> => (
    <TestModal/>
  );

  private showModal = (): void => {
    const component = this.createModal();
    ModalService.showDialog(component, true);
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

class TestModal extends React.Component<ModalComponentCloseProps> {

  private createModal = (): React.ReactElement<any> => (
    <InnerTestModal/>
  );

  private showModal = (): void => {
    const component = this.createModal();
    ModalService.showDialog(component);
  };

  render() {
    return (
      <View style={styles.outerModal}>
        <Text>This is test Outer Modal</Text>
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
        <Text>This is test Inner Modal</Text>
        <Button
          title='Close Modal'
          onPress={this.props.onCloseModal}
        />
      </View>
    );
  }
}

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
