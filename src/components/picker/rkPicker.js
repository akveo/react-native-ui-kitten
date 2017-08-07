import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  FlatList
} from 'react-native';
import {RkButton} from '../button/rkButton';
import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent';
import {RkStyleSheet} from '../../styles/styleSheet';

export class RkPicker extends RkComponent {
  componentName = 'RkPicker';
  typeMapping = {};

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.pickerHeight = 3 * this.optionHeight;
    this.state = {selectedIndex: 0};
  }

  getItemLayout(data, index){
    return {length: this.optionHeight, offset: this.optionHeight * index, index}
  }

  renderOption(option, index) {
    return (
      <View style={[styles.option, {height: this.optionHeight}]}>
        <RkText rkType='subtitle xxlarge'>
          {option}
        </RkText>
      </View>
    )
  }

  fixScroll(e) {
    let y = 0;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    let selectedIndex = Math.round(y / this.optionHeight);
    this.flatListRef.scrollToIndex({animated: true, index: selectedIndex});
    this.state.selectedIndex = selectedIndex+1;
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
                <RkText rkType='xxlarge header' syle={[styles.modalElement]}>{this.props.title}</RkText>
                <View style={[styles.modalElement, {height: this.pickerHeight}]}>
                  <FlatList data={this.props.data}
                            renderItem={({item, index}) => this.renderOption(item, index)}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                            ref={(flatListRef) => this.flatListRef = flatListRef}
                            onScrollEndDrag={(e) => this.fixScroll(e)}
                            getItemLayout={(data, index) => this.getItemLayout(data, index)}
                  />
                </View>
                <View style={[styles.buttonsBlock, styles.modalElement]}>
                  <RkButton rkType='xxlarge outline'
                            style={[styles.button]}
                            onPress={() => this.props.onCancel()}>
                    CANCEL
                  </RkButton>
                  <RkButton rkType='xxlarge outline'
                            style={[styles.button]}
                            onPress={() => this.props.onConfirm(this.props.data[this.state.selectedIndex])}>
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
  modalElement: {
    marginVertical: 10
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  test: {
    borderWidth: 2,
    borderColor: theme.colors.border.primary
  }
}));