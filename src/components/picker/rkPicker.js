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
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.state = {selectedIndexes: this.props.selectedIndexes};
    this.listRefs = new Array(this.props.data.length);
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
          <View style={[styles.modalContent]}>
            <RkText rkType='xxlarge header' syle={styles.modalElement}>{this.props.title}</RkText>
            <View style={[styles.listsContainer, styles.modalElement, {height: this.pickerHeight}]}
                  componentDidMount={() => this.setInitialOptions()}>
              {this.props.data.map(this.renderList.bind(this))}
            </View>
            <View style={[styles.buttonsBlock, styles.modalElement]}>
              <RkButton rkType='xxlarge outline'
                        style={[styles.button]}
                        onPress={() => this.props.onCancel()}>
                CANCEL
              </RkButton>
              <RkButton rkType='xxlarge outline'
                        style={[styles.button]}
                        onPress={() => this.props.onConfirm(this.state.selectedIndexes)}>
                OK
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderList(data, listIndex) {
    return (
      <FlatList data={data}
                key={listIndex}
                renderItem={({item, index}) => this.renderOption(item, index, listIndex)}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ref={(flatListRef) => this.listRefs[listIndex] = flatListRef}
                onScrollEndDrag={(e) => this.fixScroll(e, listIndex)}
                getItemLayout={(itemData, index) => this.getItemLayout(itemData, index)}
      />
    );
  }

  renderOption(option, optionIndex, listIndex) {
    return (
      <View style={[styles.option, {height: this.optionHeight}]}>
        <RkText rkType='subtitle xxlarge'>
          {option}
        </RkText>
      </View>
    )
  }

  setInitialOptions() {
    this.state.selectedIndexes.forEach((item, index) => this.selectOption(item, index));
  }

  fixScroll(e, listIndex) {
    let y = e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.y : 0;
    let selectedIndex = Math.round(y / this.optionHeight);
    this.selectOption(selectedIndex, listIndex);
  }

  selectOption(optionIndex, listIndex) {
    this.listRefs[listIndex].scrollToIndex({animated: true, index: optionIndex});
    this.state.selectedIndexes[listIndex] = optionIndex + Math.floor(this.optionNumberOnPicker / 2);
  }

  getItemLayout(itemData, index) {
    return {length: this.optionHeight, offset: this.optionHeight * index, index}
  }
}

let styles = RkStyleSheet.create(theme => ({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 32
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.screen.base
  },
  buttonsBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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