import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  ListView,
  DataSource,
  InteractionManager
} from 'react-native';
import {RkOption} from './rkOption';
import {RkComponent} from '../rkComponent';

export class RkOptionsList extends RkComponent {
  componentName = 'RkOptionsList';

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    this.optionHeight = this.props.optionHeight || 30;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.optionsData = this.updateOptionsData(this.props.data, this.optionNumberOnPicker);
    this.state = {
      dataSource: ds.cloneWithRows(this.optionsData),
      selectedOption: this.props.selectedOption,
      ds: ds,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollToSelected !== prevProps.scrollToSelected && this.props.scrollToSelected) {
      this.setInitialOptions();
    }
  }

  onScrollBeginDrag() {
    this.dragStart = true;
    this.timer && clearTimeout(this.timer);
  }

  onMomentumScrollBegin() {
    this.momentumStart = true;
    this.timer && clearTimeout(this.timer);
  }

  onScrollEndDrag(e, id) {
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    this.dragStart = false;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.dragStart && !this.momentumStart) {
        this.selectOption(_e, id);
      }
    }, 10);
  }

  onMomentumScrollEnd(e, id) {
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    this.momentumStart = false;
    this.timer && clearTimeout(this.timer);
    if (!this.dragStart) {
      this.selectOption(_e, id);
    }
  }

  setInitialOptions() {
    let selectedIndex = this.findIndexByValue(this.state.selectedOption, this.props.data);
    this.setState({selectedOption: this.props.data[selectedIndex]});
    InteractionManager.runAfterInteractions(() => this.scrollToIndex(selectedIndex));
    this.props.onSelect(this.state.selectedOption, this.props.id);
  }

  findIndexByValue(expectableValue, array) {
    let expectableIndex = Math.round(array.length / 2);

    array.forEach((value, index) => {
      if (this.compareOptions(value, expectableValue)) expectableIndex = index
    });
    return expectableIndex;
  }

  compareOptions(option1, option2) {
    return (option1.key && option2.key && option1.key === option2.key)
      || (!option1.key && !option2.key && option1 === option2);
  }

  scrollToIndex(index) {
    this.listRef.scrollTo({x: 0, y: index * this.optionHeight, animated: true})
  }

  updateOptionsData(optionsData, optionNumberOnPicker) {
    return this.createEmptyArray(optionNumberOnPicker / 2).concat(
      optionsData.concat(this.createEmptyArray(optionNumberOnPicker / 2))
    );
  }

  createEmptyArray(arrayLength) {
    return Array.apply(null, new Array(Math.floor(arrayLength))).map((_, i) => ' ');
  }

  selectOption(e, id) {
    let y = e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.y : 0;
    let selectedIndex = Math.round(y / this.optionHeight);
    this.setState({
      selectedOption: this.props.data[selectedIndex],
      dataSource: this.state.ds.cloneWithRows(this.optionsData),
    });
    this.scrollToIndex(selectedIndex);
    this.props.onSelect(this.props.data[selectedIndex], id);
  }

  renderOption(option, optionBlock) {
    return (
      <RkOption
        data={option}
        selectedOption={this.state.selectedOption}
        style={optionBlock}
        optionHeight={this.optionHeight}
        optionRkType={this.props.optionRkType}
        selectedOptionRkType={this.props.selectedOptionRkType}/>
    );
  }

  render() {
    let highlightVarStyle = {
      top: (this.optionNumberOnPicker - 1) / 2 * this.optionHeight,
      height: this.optionHeight,
    };
    return (
      <View style={this.props.optionListContainerStyle}>
        <View style={[highlightVarStyle, this.props.highlightBlockStyle]}/>
        <ListView
          bounces={false}
          showsVerticalScrollIndicator={false}
          ref={(flatListRef) => this.listRef = flatListRef}
          onMomentumScrollBegin={(e) => this.onMomentumScrollBegin()}
          onMomentumScrollEnd={(e) => this.onMomentumScrollEnd(e, this.props.id)}
          onScrollBeginDrag={(e) => this.onScrollBeginDrag()}
          onScrollEndDrag={(e) => this.onScrollEndDrag(e, this.props.id)}
          dataSource={this.state.dataSource}
          renderRow={(item, sectionID, rowId) => this.renderOption(item, this.props.optionBlockStyle)}
          enableEmptySections={true}
          initialListSize={this.optionsData.length}
        />
      </View>
    );
  }
}