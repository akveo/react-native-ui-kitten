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
    buttonStyle: {},
    modalElementStyle: {},
    optionStyle: {}
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
      buttonStyle
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
              {this.props.data.map((array, index) =>
                <RkOptionsList key={index}
                               id={index}
                               data={array}
                               selectedOption={this.state.selectedOptions[index]}
                               scrollToSelected={this.state.scrollToSelected}
                               onSelect={(selectedOption, listIndex) => this.selectOption(selectedOption, listIndex)}
                               optionHeight={this.optionHeight}
                               optionNumberOnPicker={this.optionNumberOnPicker}/>
              )}
            </View>
            <View style={[buttonsBlockStyle, modalElementStyle]}>
              <RkButton rkType='xxlarge outline'
                        style={buttonStyle}
                        onPress={() => this.props.onCancel()}>
                CANCEL
              </RkButton>
              <RkButton rkType='xxlarge outline'
                        style={buttonStyle}
                        onPress={() => this.props.onConfirm(this.state.selectedOptions)}>
                OK
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  selectOption(selectedOption, listIndex) {
    this.state.selectedOptions[listIndex] = selectedOption;
  }
}