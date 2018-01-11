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
import {RkOptionsList} from './rkOptionsList';

/**
 * `RkPicker` is a modal window with lists of options that can be selected
 *
 * @extends RkComponent
 *
 * @example Usage example:
 *
 * ```
 * let data = [
 *      [{key: 1, value: 'Jun'}, {key: 2, value: 'Feb'}, {key: 3, value: 'Mar'}, {key: 4, value: 'Apr'}],
 *      [1, 2, 3, 4, 5],
 *      [2017, 2018, 2019]]
 *
 * //...
 *
 * <RkPicker
 *   title='Set Date'
 *   data={data}
 *   visible={this.state.pikerVisible}
 *   selectedOptions={this.state.pickedValue}
 *   onConfirm={(data) => {
 *      this.setState({pickedValue: data})
 *      this.setState({pikerVisible: false})
 *      };}
 *   onCancel={() => this.setState({pikerVisible: false})}/>
 * ```
 *
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkPicker','rounded',{
 *    windowBorderRadius: 15,
 *    windowBorderWidth: 0.5,
 *    windowBorderColor: 'black',
 * });
 *
 * //...
 *
 * <RkPicker rkType='rounded' ... />
 * ```
 *
 *
 * @styles Available style properties:
 * - `backgroundColor` : Background color of full screen when modal window is visible. Applied for 'modalContentBlock' component.
 * - `windowBackgroundColor` : Background color of modal window. Applied for 'modalContentBlock' component.
 * - `windowBorderRadius` : Border radius of modal window. Applied for 'modalContentBlock' component.
 * - `windowBorderWidth` : Border width of modal window. Applied for 'modalContentBlock' component.
 * - `windowBorderColor` : Border color of modal window. Applied for 'modalContentBlock' component.
 * - `cancelBorderColor` : Border color of cancel button. Applied for 'cancelButtonBlock' component.
 * - `confirmBorderColor` : Border color of confirm button. Applied for 'confirmButtonBlock' component.
 * - `highlightBorderTopColor` : Top border color of highlight option. Applied for 'highlightBlock' component.
 * - `highlightBorderBottomColor` : Bottom border color of highlight option. Applied for 'highlightBlock' component.
 * - `highlightBorderTopWidth` : Top border width of highlight option. Applied for 'highlightBlock' component.
 * - `highlightBorderBottomWidth` : Bottom border width of highlight option. Applied for 'highlightBlock' component.
 * - ...: Any other style properties defined without specifying component explicitly will be applied to the default one.
 *
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkPicker` consists from several of base react component.
 * It's easy to set styles for each component.
 *
 * ```
 * RkTheme.setType('RkPicker', 'bordered', {
 *   modalContentBlock: {
 *     marginHorizontal: 64,
 *   },
 *   windowBorderRadius: 1,
 *   windowBorderWidth: 0.5,
 *   windowBorderColor: 'black',
 *   buttonsBlockBlock: {
 *     marginTop: 10,
 *   }
 * });
 *
 * //...
 *
 *  <RkPicker rkType='bordered'/>
 * ```
 *
 * @styles Available components for advanced styling:
 * - `modalContainerBlock` (Default): `View` component on full screen. Container for `modalContentBlock`
 * - `modalContentBlock` : `View` component with modal content. Container for `titleBlock`, `listsContainerBlock` and `buttonsBlockBlock`
 * - `titleBlock` : `RkText` component with title text
 * - `listsContainerBlock` : `View` component with list of options list. Container for `optionListContainer`
 * - `buttonsBlockBlock` : `View` component with Confirm and Cancel buttons. Container for `cancelButtonBlock` and `confirmButtonBlock`
 * - `cancelButtonBlock` : `RkButton` component for cancel functionality
 * - `confirmButtonBlock` : `RkButton` component for confirm functionality
 * - `optionListContainer` : `View` component with options list and highlight. Container for `highlightBlock` and `ListView` with `optionBlock`'s
 * - `highlightBlock` : `View` component for highlight functionality
 * - `optionBlock` : `View` component with option text
 *
 *
 * @property {string} rkType - Types for component stylization
 * @property {style} style - Style for window with options lists
 * @property {bool} visible - Determines whether component is visible
 * @property {array} data - Array of inner arrays with data for options list.
 * Option will be primitive or object with next structure: {key: '', value: ''}.
 * Inner array structure example: ```[42, 'test', {key: 1, value: 'Monday'}, {key: 'Spring', value: 2}]```
 * @property {array} selectedOptions - Array with selected options.
 * @property {function} onConfirm - Called after pressing on Confirm button
 * @property {function} onCancel - Called after pressing on Cancel button
 * @property {string} title - Text for title of window with options lists
 * @property {string} confirmButtonText - Text for confirm button. Default value: OK
 * @property {string} cancelButtonText - Text for cancel button. Default value: CANCEL
 * @property {string} confirmTextRkType - RkType of text for confirm button. Default value: header
 * @property {string} cancelTextRkType - RkType of text for cancel button.
 * @property {string} confirmButtonRkType - RkType of confirm button. Default value: transparent rectangle
 * @property {string} cancelButtonRkType - RkType of cancel button. Default value: transparent rectangle
 * @property {string} titleTextRkType - RkType of title text. Default value: header
 * @property {number} optionHeight - Height of option in options list. Default value: 50
 * @property {number} optionNumberOnPicker - Number of visible options on option list. Default value: 3
 * @property {string} optionRkType - Types for RkText component with option
 * @property {string} selectedOptionRkType - Types for RkText component with selected option

 */
export class RkPicker extends RkComponent {
  componentName = 'RkPicker';
  typeMapping = {
    modalContainerBlock: {},
    modalContentBlock: {
      windowBackgroundColor: 'backgroundColor',
      windowBorderRadius: 'borderRadius',
      windowBorderWidth: 'borderWidth',
      windowBorderColor: 'borderColor',
    },
    titleBlock: {},
    listsContainerBlock: {},
    buttonsBlockBlock: {},
    optionBlock: {},
    optionListContainer: {},
    cancelButtonBlock: {
      cancelBorderColor: 'borderColor',
    },
    confirmButtonBlock: {
      confirmBorderColor: 'borderColor',
    },
    highlightBlock: {
      highlightBorderTopColor: 'borderTopColor',
      highlightBorderBottomColor: 'borderBottomColor',
      highlightBorderTopWidth: 'borderTopWidth',
      highlightBorderBottomWidth: 'borderBottomWidth',
    },
  };

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 50;
    this.optionNumberOnPicker = this.props.optionNumberOnPicker || 3;
    this.pickerHeight = this.optionNumberOnPicker * this.optionHeight;
    this.confirmButtonText = this.props.confirmButtonText || 'OK';
    this.cancelButtonText = this.props.cancelButtonText || 'CANCEL';
    this.confirmTextRkType = this.props.confirmTextRkType || 'header';
    this.cancelTextRkType = this.props.cancelTextRkType || '';
    this.confirmButtonRkType = this.props.confirmButtonRkType || 'transparent rectangle';
    this.cancelButtonRkType = this.props.cancelButtonRkType || 'transparent rectangle';
    this.titleTextRkType = this.props.titleTextRkType || 'header';
    this.state = {
      scrollToSelected: false,
      selectedOptions: this.props.selectedOptions.slice()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        scrollToSelected: this.props.visible,
        selectedOptions: this.props.selectedOptions.slice()
      });
    }
  }

  selectOption(selectedOption, listIndex) {
    this.state.selectedOptions[listIndex] = selectedOption;
  }

  renderOptionList(array, index, optionBlock, highlightBlock, optionListContainer) {
    return (
      <RkOptionsList
        rkType={this.props.rkType}
        key={index}
        id={index}
        data={array}
        selectedOption={this.state.selectedOptions[index]}
        scrollToSelected={this.state.scrollToSelected}
        onSelect={(selectedOption, listIndex) => this.selectOption(selectedOption, listIndex)}
        optionHeight={this.optionHeight}
        optionNumberOnPicker={this.optionNumberOnPicker}
        optionRkType={this.props.optionRkType}
        selectedOptionRkType={this.props.selectedOptionRkType}
        optionBlockStyle={optionBlock}
        highlightBlockStyle={highlightBlock}
        optionListContainerStyle={optionListContainer}
      />
    );
  }

  render() {
    let {
      modalContainerBlock, modalContentBlock, titleBlock, buttonsBlockBlock, listsContainerBlock,
      cancelButtonBlock, confirmButtonBlock, optionBlock, highlightBlock, optionListContainer
    } = super.defineStyles(this.props.rkType);

    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.props.onCancel()}>

        <View style={[modalContainerBlock]}>
          <View style={[modalContentBlock, this.props.style]}>
            <RkText rkType={this.titleTextRkType} style={titleBlock}>{this.props.title}</RkText>
            <View style={[listsContainerBlock, {height: this.pickerHeight}]}>
              {this.props.data.map((array, index) => this.renderOptionList(array, index, optionBlock, highlightBlock, optionListContainer))}
            </View>
            <View style={[buttonsBlockBlock]}>
              <RkButton rkType={this.cancelButtonRkType}
                        style={cancelButtonBlock}
                        onPress={() => this.props.onCancel()}>
                <RkText rkType={this.cancelTextRkType}>{this.cancelButtonText}</RkText>
              </RkButton>
              <RkButton rkType={this.confirmButtonRkType}
                        style={confirmButtonBlock}
                        onPress={() => this.props.onConfirm(this.state.selectedOptions)}>
                <RkText rkType={this.confirmTextRkType}>{this.confirmButtonText}</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}