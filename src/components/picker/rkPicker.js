import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
} from 'react-native';
import {RkButton} from '../button/rkButton';
import {RkText} from '../text/RkText';
import {RkComponent} from '../rkComponent';
import {RkStyleSheet} from '../../styles/styleSheet';

export class RkPicker extends RkComponent {
  componentName = 'RkPicker';
  typeMapping = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => this.props.onCancel()}
      >
        <View style={[styles.modalContainer]}>
          <View style={{flex: 0.1}}/>
          <View style={{flex: 0.8}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 0.2}}/>
              <View style={[styles.modalContent]}>
                <RkText rkType='header'>{this.props.title}</RkText>
                <View>
                </View>
                <View style={[styles.buttonsBlock]}>
                  <RkButton rkType='small outline'
                            style={[styles.button]}
                            onPress={() => this.props.onCancel()}>
                    CANCEL
                  </RkButton>
                  <RkButton rkType='small outline'
                            style={[styles.button]}
                            onPress={() => this.props.onConfirm('PICKED VALUE')}>
                    OK
                  </RkButton>
                </View>
              </View>
              <View style={{flex: 0.4}}/>
            </View>
          </View>
          <View style={{flex: 0.1}}/>
        </View>
      </Modal>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 0.4,
    backgroundColor: theme.colors.screen.base
  },
  buttonsBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    flex: 0.5
  },
}));