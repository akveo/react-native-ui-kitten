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

export class RkPicker extends RkComponent {
  componentName = 'RkPicker';
  typeMapping = {
    modalContainerStyle: {
    },
    modalContentStyle: {
      borderRadius: 'borderRadius',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      underlineColor: 'underlineColor',
    },
    buttonsBlockStyle: {},
    listsContainerStyle: {},
    buttonStyle: {},
    modalElementStyle: {},
    optionStyle: {}
  };

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.listRefs = new Array(this.props.data.length);
    this.state = {
      selectedIndexes: this.props.selectedIndexes,
      optionsData: this.updateOptionsData(this.props.data, this.optionNumberOnPicker)
    };
  }

  updateOptionsData(optionsData, optionNumberOnPicker) {
    let updatedOptionsData = new Array(optionsData.length);
    optionsData.forEach((array, index) => {
      updatedOptionsData[index] = this.createEmptyArray(optionNumberOnPicker / 2).concat(
        array.concat(this.createEmptyArray(optionNumberOnPicker / 2))
      );
    });
    return updatedOptionsData;
  }

  createEmptyArray(arrayLength) {
    return Array.apply(null, new Array(Math.floor(arrayLength))).map((_, i) => ' ');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible && this.props.visible) {
      this.setInitialOptions();
    }
  }

  render() {
    let {
      modalContainerStyle, modalContentStyle, modalElementStyle, buttonsBlockStyle, listsContainerStyle,
      buttonStyle, optionStyle
    } = super.defineStyles(this.props.rkType);
    return (
      <Modal
        visible={this.props.visible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => this.props.onCancel()}
      >
        <View style={[modalContainerStyle]}>
          <View style={[modalContentStyle]}>
            <RkText rkType='xxlarge header' syle={modalElementStyle}>{this.props.title}</RkText>
            <View style={[listsContainerStyle, modalElementStyle, {height: this.pickerHeight}]}>
              {this.state.optionsData.map((array, index) => this.renderList(array, index, optionStyle))}
            </View>
            <View style={[buttonsBlockStyle, modalElementStyle]}>
              <RkButton rkType='xxlarge outline'
                        style={buttonStyle}
                        onPress={() => this.props.onCancel()}>
                CANCEL
              </RkButton>
              <RkButton rkType='xxlarge outline'
                        style={buttonStyle}
                        onPress={() => this.props.onConfirm(this.state.selectedIndexes)}>
                OK
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderList(data, listIndex, optionStyle) {
    return (
      <FlatList data={data}
                key={listIndex}
                renderItem={({item, index}) => this.renderOption(item, optionStyle)}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ref={(flatListRef) => this.listRefs[listIndex] = flatListRef}
                onScrollEndDrag={(e) => this.fixScroll(e, listIndex)}
                getItemLayout={(itemData, index) => this.getItemLayout(itemData, index)}/>
    );
  }

  renderOption(option, optionStyle) {
    return (
      <View style={[optionStyle, {height: this.optionHeight}]}>
        <RkText rkType='subtitle xxlarge'>
          {option}
        </RkText>
      </View>
    )
  }

  setInitialOptions() {
    this.state.selectedIndexes.forEach((optionIndex, listIndex) => {
      setTimeout(() => {
        this.listRefs[listIndex].scrollToIndex({
          animated: true,
          index: optionIndex
        });
        this.state.selectedIndexes[listIndex] = optionIndex;
      }, 0);
    });
  }

  fixScroll(e, listIndex) {
    let y = e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.y : 0;
    let optionIndex = Math.round(y / this.optionHeight);
    this.listRefs[listIndex].scrollToIndex({animated: true, index: optionIndex});
    this.state.selectedIndexes[listIndex] = optionIndex;
  }

  getItemLayout(itemData, index) {
    return {length: this.optionHeight, offset: this.optionHeight * index, index}
  }
}