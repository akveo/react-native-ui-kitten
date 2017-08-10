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
import {RkOptionsList} from '../optionsList/rkOptionsList';

export class RkPicker extends RkComponent {
  componentName = 'RkPicker';
  typeMapping = {
    modalContainerStyle: {},
    modalContentStyle: {
      borderRadius: 'borderRadius',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      underlineColor: 'underlineColor',
    },
    buttonsBlockStyle: {},
    listsContainerStyle: {},
    cancelButtonStyle: {},
    okButtonStyle: {},
    modalElementStyle: {},
    optionStyle: {},
    highlightConstStyle: {},
  };

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.state = {
      scrollToSelected: false,
      selectedOptions: this.props.selectedOptions
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({scrollToSelected: this.props.visible});
    }
  }

  render() {
    let {
      modalContainerStyle, modalContentStyle, modalElementStyle, buttonsBlockStyle, listsContainerStyle,
      cancelButtonStyle, okButtonStyle, highlightConstStyle
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
            <RkText rkType='header' style={modalElementStyle}>{this.props.title}</RkText>
            <View style={[listsContainerStyle, {height: this.pickerHeight}]}>
              {this.props.data.map((array, index) => this.renderOptionList(array, index, highlightConstStyle))}
            </View>
            <View style={[buttonsBlockStyle]}>
              <RkButton rkType='transparent rectangle'
                        style={cancelButtonStyle}
                        onPress={() => this.props.onCancel()}>
                <RkText>CANCEL</RkText>
              </RkButton>
              <RkButton rkType='transparent rectangle'
                        style={okButtonStyle}
                        onPress={() => this.props.onConfirm(this.state.selectedOptions)}>
                <RkText rkType='header'>OK</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderOptionList(array, index, highlightConstStyle) {
    let highlightVarStyle = {
      top: (this.optionNumberOnPicker - 1) / 2 * this.optionHeight,
      height: this.optionHeight,
    };
    return (
      <View key={index}>
        <View style={[highlightVarStyle, highlightConstStyle]}/>
        <RkOptionsList id={index}
                       data={array}
                       selectedOption={this.state.selectedOptions[index]}
                       scrollToSelected={this.state.scrollToSelected}
                       onSelect={(selectedOption, listIndex) => this.selectOption(selectedOption, listIndex)}
                       optionHeight={this.optionHeight}
                       optionNumberOnPicker={this.optionNumberOnPicker}/>
      </View>
    );
  }

  selectOption(selectedOption, listIndex) {
    this.state.selectedOptions[listIndex] = selectedOption;
  }
}