import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Datepicker,
  Calendar,
  Modal,
  Button,
} from '@kitten/ui';

interface State {
  date: Date;
  modalVisible: boolean;
}

export class DatepickerContainer extends React.Component<any, State> {

  public state: State = {
    date: null,
    modalVisible: false,
  };

  private setDate = (date: Date): void => {
    this.setState({ date });
  };

  private setModalVisible = (): void => {
    const modalVisible: boolean = !this.state.modalVisible;

    this.setState({ modalVisible });
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        {/*<Calendar*/}
          {/*date={this.state.date}*/}
          {/*onSelect={this.setDate}*/}
        {/*/>*/}

        <Modal
          style={{ width: '100%'}}
          allowBackdrop={true}
          visible={this.state.modalVisible}
          onBackdropPress={this.setModalVisible}
        >
          <Calendar
            date={this.state.date}
            onSelect={this.setDate}
          />
        </Modal>

        <Button onPress={this.setModalVisible}>Show Calendar</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
