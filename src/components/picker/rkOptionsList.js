import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  ListView,
  DataSource,
} from 'react-native';
import {RkOption} from './rkOption';
import {RkComponent} from '../rkComponent';

export class RkOptionsList extends RkComponent {
  componentName = 'RkOptionsList';
  typeMapping = {
    highlightBlock: {
      highlightBorderTopColor: 'borderTopColor',
      highlightBorderBottomColor: 'borderBottomColor',
      highlightBorderTopWidth: 'borderTopWidth',
      highlightBorderBottomWidth: 'borderBottomWidth',
    },
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.optionHeight = this.props.optionHeight || 30;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.state = {
      optionsData: ds.cloneWithRows(this.updateOptionsData(this.props.data, this.optionNumberOnPicker)),
      selectedOption: this.props.selectedOption
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrollToSelected !== prevProps.scrollToSelected && this.props.scrollToSelected) {
      this.setInitialOptions();
    }
  }

  onScrollBeginDrag() {
    this.dragStarted = true;
    this.timer && clearTimeout(this.timer);
  }

  onScrollEndDrag(e, id) {
    this.dragStarted = false;
    let _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        if (!this.dragStarted) {
          this.selectOption(_e, id);
        }
      },
      10
    );
  }

  onMomentumScrollBegin() {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  }

  onMomentumScrollEnd(e, id) {
    this.momentumStarted = false;
    if (!this.momentumStarted && !this.dragStarted) {
      this.selectOption(e, id);
    }
  }

  setInitialOptions() {
    let selectedIndex = this.findIndexByValue(this.state.selectedOption, this.props.data);
    this.setState({selectedOption: this.props.data[selectedIndex]});
    setTimeout(() => {
      this.scrollToIndex(selectedIndex);
    }, 0);
    this.props.onSelect(this.state.selectedOption, this.props.id);
  }

  findIndexByValue(expectableValue, array) {
    let expectableIndex = Math.round(array.length / 2);

    array.forEach((value, index) => {
      if ((value.key && expectableValue.key && value.key === expectableValue.key)
        || (!value.key && !expectableValue.key && value === expectableValue)) expectableIndex = index
    });
    return expectableIndex;
  }

  scrollToIndex(index) {
    alert(index);
    this.listRef.scrollTo({y: index * this.optionHeight})
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
    this.setState({selectedOption: this.props.data[selectedIndex]});
    this.scrollToIndex(selectedIndex);
    this.props.onSelect(this.props.data[selectedIndex], id);
  }

  renderOption(option, index, optionBlock) {
    return (
      <RkOption
        data={option}
        key={index}
        selectedOption={this.state.selectedOption}
        style={optionBlock}
        optionHeight={this.optionHeight}
        optionRkType={this.props.optionRkType}
        selectedOptionRkType={this.props.selectedOptionRkType}/>
    );
  }

  render() {
    let {
      optionBlock, highlightBlock, optionListContainer
    } = super.defineStyles(this.props.rkType);
    let highlightVarStyle = {
      top: (this.optionNumberOnPicker - 1) / 2 * this.optionHeight,
      height: this.optionHeight,
    };
    return (
      <View style={optionListContainer}>
        <View style={[highlightVarStyle, highlightBlock]}/>
        <ListView
          key={this.state.selectedOption}
          bounces={false}
          showsVerticalScrollIndicator={false}
          ref={(flatListRef) => this.listRef = flatListRef}
          onMomentumScrollBegin={(e) => this.onMomentumScrollBegin()}
          onMomentumScrollEnd={(e) => this.onMomentumScrollEnd(e, this.props.id)}
          onScrollBeginDrag={(e) => this.onScrollBeginDrag()}
          onScrollEndDrag={(e) => this.onScrollEndDrag(e, this.props.id)}
          dataSource={this.state.optionsData}
          renderRow={(item, index) => this.renderOption(item, index, optionBlock)}
          pageSize={this.optionNumberOnPicker}
        />
      </View>
    );
  }
}