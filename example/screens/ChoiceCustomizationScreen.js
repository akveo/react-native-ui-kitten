import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  RkText,
  RkChoiceGroup,
  RkChoice,
  RkTheme,
} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';

export class ChoiceCustomizationScreen extends React.Component {
  static navigationOptions = {
    title: 'Customization examples',
  };

  renderCustomChoiceContent = (args) => {
    if (args.isSelected) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <ActivityIndicator />
          <RkText style={{ marginLeft: 4 }}>Hello custom content!</RkText>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <RkChoiceGroup rkType='stretch' style={UtilStyles.spaceTop}>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 1</RkText>
              <RkChoice selected={true} rkType='posNeg magentaCyan' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 2</RkText>
              <RkChoice rkType='posNegClearCheck' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 3</RkText>
              <RkChoice
                selected={true}
                rkType='clear'
                style={{ borderWidth: 1, borderRadius: 20, borderColor: '#da7b00' }}
                contentStyle={{ tintColor: '#ff9102' }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 4</RkText>
              <RkChoice rkType='whiteGreenCheck' selected={true} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 5</RkText>
              <RkChoice rkType='star' selected={true} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 6</RkText>
              <RkChoice selected={true} rkType='rainbowCat' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity choiceTrigger={true}>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 7</RkText>
              <RkChoice
                style={{ backgroundColor: 'transparent', borderWidth: 0 }}
                renderContentFunction={this.renderCustomChoiceContent}
                selected={true}
              />
            </View>
          </TouchableOpacity>
        </RkChoiceGroup>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 1</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio={true} selectedIndex={0}>
              <TouchableOpacity choiceTrigger={true}>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio' contentStyle={{ tintColor: 'magenta' }} />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger={true}>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio' contentStyle={{ tintColor: 'magenta' }} />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 2</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio={true} selectedIndex={0}>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio squadRadio' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio squadRadio' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 3</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio={true} selectedIndex={0}>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio kitten' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio kitten' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 4</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio={true} selectedIndex={0}>
              <TouchableOpacity choiceTrigger={true}>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio smileColor' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio smileColor' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 2</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger={true}>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio smileColor' />
                  <RkText rkType='bold' style={{ marginLeft: 16.5 }}>Option 3</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  checkRow: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RkTheme.current.colors.border.base,
    alignItems: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 11,
    alignItems: 'center',
  },
});
