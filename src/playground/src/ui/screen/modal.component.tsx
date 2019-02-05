import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Modal as ModalComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  modalVisible: boolean;
}

class ModalTest extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Modal Component',
  };

  public state: State = {
    modalVisible: false,
  };

  public setModalVisible = (value: boolean): void => {
    this.setState({ modalVisible: value });
  };

  private renderModalComponent(): React.ReactElement<any> {
    return (
      <View>
        <Text>This is modal content</Text>
        <Button title={'Hide Modal'} onPress={() => this.setModalVisible(false)}/>
      </View>
    );
  }

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Button title={'Show Modal'} onPress={() => this.setModalVisible(true)}/>
        <ModalComponent
          identifier={'test'}
          visible={this.state.modalVisible}
          style={this.props.themedStyle.modal}
          isBackDropAllowed={true}
          onCloseModal={() => this.setModalVisible(false)}
        >
          {this.renderModalComponent()}
        </ModalComponent>
      </View>
    );
  }
}

export const ModalScreen = withStyles(ModalTest, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'yellow',
    borderWidth: 2,
    top: 100,
    left: 50,
  },
}));
