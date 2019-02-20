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
  modal1Visible: boolean;
  modal2Visible: boolean;
}

class ModalTest extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Modal Component',
  };

  public state: State = {
    modal1Visible: false,
    modal2Visible: false,
  };

  public setModal1Visible = (value: boolean): void => {
    this.setState({ modal1Visible: value });
  };

  public setModal2Visible = (value: boolean): void => {
    this.setState({ modal2Visible: value });
  };

  private renderModal1Component(): React.ReactElement<any> {
    return (
      <View>
        <Text>This is modal "fade" content</Text>
        <Button title={'Hide Modal'} onPress={() => this.setModal1Visible(false)}/>
      </View>
    );
  }

  private renderModal2Component(): React.ReactElement<any> {
    return (
      <View>
        <Text>This is modal "slide" content</Text>
        <Button title={'Hide Modal'} onPress={() => this.setModal2Visible(false)}/>
      </View>
    );
  }

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Button title={'Show Modal 1'} onPress={() => this.setModal1Visible(true)}/>
        <Button title={'Show Modal 2'} onPress={() => this.setModal2Visible(true)}/>
        <ModalComponent
          identifier={'test1'}
          visible={this.state.modal1Visible}
          style={this.props.themedStyle.modal1}
          onCloseModal={() => this.setModal1Visible(false)}
          animationType='fade'
          animationDuration={600}
        >
          {this.renderModal1Component()}
        </ModalComponent>
        <ModalComponent
          identifier={'test2'}
          visible={this.state.modal2Visible}
          style={this.props.themedStyle.modal2}
          isBackDropAllowed={true}
          onCloseModal={() => this.setModal2Visible(false)}
          animationType='slideInUp'
          animationDuration={600}
        >
          {this.renderModal2Component()}
        </ModalComponent>
      </View>
    );
  }
}

export const ModalScreen = withStyles(ModalTest, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  modal1: {
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
  modal2: {
    width: 300,
    height: 200,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
    top: 300,
    left: 50,
  },
}));
