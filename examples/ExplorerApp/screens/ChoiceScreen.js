import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkChoiceGroup,
  RkChoice,
  RkTheme
} from 'react-native-ui-kitten';
import {UtilStyles} from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ChoiceScreen extends React.Component {
  static navigationOptions = {
    title: 'Selectable components'
  };

  constructor(props) {
    super(props);
    this.state = {
      settingsOption: {
        index: 0,
        name: 'Option 1'
      },
      pikerVisible: false,
      pickedValue: 'Pick Value',
      selectedOption: 0,
      onChangeHandleText: 'Option 3 selected'
    };
    this.hidePicker = this.hidePicker.bind(this)
    this.handlePickedValue = this.handlePickedValue.bind(this)
  }

  hidePicker() {
    this.setState({pikerVisible: false});
  }

  handlePickedValue(date) {
    this.setState({pickedValue: date});
    this.hidePicker();
  };

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Classic selectable components</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <RkChoice/>
              <RkText rkType='bold' style={styles.caption}>Default</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='radio'/>
              <RkText rkType='bold' style={styles.caption}>Radio</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='clear' selected/>
              <RkText rkType='bold' style={styles.caption}>Clear</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='posNeg'/>
              <RkText rkType='bold' style={styles.caption}>Positive / Negative</RkText>
            </View>
          </View>
        </View>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Labels Example</RkText>
          <View style={[UtilStyles.columnContainer]}>
            <RkChoiceGroup rkType='bordered'>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <RkText rkType='bold'>Label</RkText>
                  <RkChoice style={{marginLeft: 17}} rkType='posNeg'/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>

          </View>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup rkType='bordered stretch' style={UtilStyles.spaceTop}>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View>
                    <RkText rkType='bold'>Hello</RkText>
                    <RkText>Click me!</RkText>
                  </View>
                  <RkChoice style={{alignSelf: 'center'}}/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>

          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup rkType='stretch' style={UtilStyles.spaceTop}>
              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 1</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 2</RkText>
                  <RkChoice rkType='clear' selected/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 3</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 4</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>

            </RkChoiceGroup>
          </View>
        </View>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>{'Radio components - ' + this.state.onChangeHandleText}</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio selectedIndex={2} onChange={(index) => this.setState({onChangeHandleText: 'Option ' + (index + 1) + ' selected'})}>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 3</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceTop]}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 4</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
        <View style={[UtilStyles.bordered]}>
          <TouchableOpacity style={{padding: 23}} onPress={() => this.showSettingsScreen()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RkText>Setting Example</RkText>
              <View style={{flexDirection: 'row'}}>
                <RkText rkType='bold'>{this.state.settingsOption.name}</RkText>
                <Icon name={'angle-right'} size={20} style={{marginLeft: 16, opacity: 0.3}}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 23}} onPress={() => this.showCustomExamplesScreen()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RkText>Customization Examples</RkText>
              <View style={{flexDirection: 'row'}}>
                <Icon name={'angle-right'} size={20} style={{marginLeft: 16, opacity: 0.3}}/>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Disabled components</RkText>
          <View style={[UtilStyles.rowContainer]}>
            <View style={[UtilStyles.columnContainer, {flex: 1}]}>
              <View style={styles.componentRow}>
                <RkChoice disabled/>
                <RkText rkType='bold' style={styles.caption}>Default</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='radio' disabled/>
                <RkText rkType='bold' style={styles.caption}>Radio</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='posNeg' disabled/>
                <RkText rkType='bold' style={styles.caption}>Clear</RkText>
              </View>
            </View>
            <View style={[UtilStyles.columnContainer, {flex: 1}]}>
              <View style={styles.componentRow}>
                <RkChoice disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Default</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='radio' disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Radio</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='clear' disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Clear</RkText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  showSettingsScreen() {
    const {navigate} = this.props.navigation;
    navigate('Settings', {
      option: this.state.settingsOption,
      onChange: (option) => {
        this.setState({
          settingsOption: option
        })
      }
    });
  }

  showCustomExamplesScreen() {
    const {navigate} = this.props.navigation;
    navigate('ChoiceCustomization', {
      option: this.state.settingsOption,
      onChange: (option) => {
        this.setState({
          settingsOption: option
        })
      }
    });
  }
}


const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  caption: {
    marginLeft: 16
  },
  checkRow: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RkTheme.current.colors.border.base
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 11,
    alignItems: 'center'
  },
  spaceBottom: {
    marginTop: 0,
    marginBottom: 11,
  },
  spaceTop: {
    marginTop: 11,
    marginBottom: 0,
  },
  settingsOption: {
    paddingVertical: 5,
    marginLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: RkTheme.current.colors.grey300,

  },
  typeText: {
    color: RkTheme.current.colors.grey500,
    textAlign: 'center'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  }
});
