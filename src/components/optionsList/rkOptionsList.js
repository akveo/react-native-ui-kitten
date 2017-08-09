import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  FlatList
} from 'react-native';
import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent';

export class RkOptionsList extends RkComponent {
  componentName = 'RkOptionsList';
  typeMapping = {
    optionStyle: {}
  };

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.optionsData = this.updateOptionsData(this.props.data, this.optionNumberOnPicker);
    this.state = {
      selectedOption: this.props.selectedOption
    };
  }

  updateOptionsData(optionsData, optionNumberOnPicker) {
    return this.createEmptyArray(optionNumberOnPicker / 2).concat(
      optionsData
        .map((item, index) => item.value || item)
        .concat(this.createEmptyArray(optionNumberOnPicker / 2))
    );
  }

  createEmptyArray(arrayLength) {
    return Array.apply(null, new Array(Math.floor(arrayLength))).map((_, i) => ' ');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollToSelected !== prevProps.scrollToSelected && this.props.scrollToSelected) {
      this.setInitialOptions();
    }
  }

  setInitialOptions() {
    let selectedIndex = this.findIndexByValue(this.state.selectedOption, this.props.data);
    setTimeout(() => {
      this.listRef.scrollToIndex({
        animated: true,
        index: selectedIndex
      });
    }, 0);
    this.state.selectedOption = this.props.data[selectedIndex].key || this.props.data[selectedIndex];
    this.props.onSelect(this.state.selectedOption, this.props.id);
  }

  findIndexByValue(expectableValue, array) {
    let expectableIndex = Math.round(array.length / 2);
    array.forEach((value, index) => {
      if ((value.key || value) === expectableValue) expectableIndex = index
    });
    return expectableIndex;
  }

  render() {
    let {
      optionStyle
    } = super.defineStyles(this.props.rkType);
    return (
      <FlatList data={this.optionsData}
                renderItem={({item, index}) => this.renderOption(item, optionStyle)}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ref={(flatListRef) => this.listRef = flatListRef}
                onScrollEndDrag={(e) => this.selectOption(e, this.props.id)}
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

  selectOption(e, id) {
    this.fixScroll(e);
    this.props.onSelect(this.state.selectedOption, id);
  }

  fixScroll(e) {
    let y = e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.y : 0;
    let optionIndex = Math.round(y / this.optionHeight);
    this.listRef.scrollToIndex({animated: true, index: optionIndex});
    this.state.selectedOption = this.props.data[optionIndex].key || this.props.data[optionIndex];
  }

  getItemLayout(itemData, index) {
    return {length: this.optionHeight, offset: this.optionHeight * index, index}
  }
}