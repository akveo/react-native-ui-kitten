import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkSwitch,
} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';

export class SwitchScreen extends React.Component {
  static navigationOptions = {
    title: 'Switches',
  };
  state = {
    switch1State: true,
    switch2State: true,
    switch3State: true,
    switch4State: true,
    switch5State: true,
    switch6State: true,
    switch7State: false,
    switch8State: false,
    switch9State: true,
    switch10State: true,
  };

  onBasicSwitchValueChange = (value) => {
    this.setState({ switch1State: value });
  };

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Basic switch</RkText>
          <RkSwitch
            value={this.state.switch1State}
            style={{ paddingVertical: 20 }}
            onValueChange={this.onBasicSwitchValueChange}
          />
          <View>
            <RkText>
              On iOS it renders like standard react-native Switch.
              We did our best to make it look the same way on Android.
            </RkText>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Predefined RkTypes</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkText>
              Easy to customize styles of control using rkType.
              Styles will be applied according to current theme.
              Here are switches with predefined rkTypes:
            </RkText>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>primary</RkText>
              <RkSwitch
                rkType='primary'
                value={this.state.switch2State}
                onValueChange={(value) => this.setState({ switch2State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>success</RkText>
              <RkSwitch
                rkType='success'
                value={this.state.switch3State}
                onValueChange={(value) => this.setState({ switch3State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>info</RkText>
              <RkSwitch
                rkType='info'
                value={this.state.switch4State}
                onValueChange={(value) => this.setState({ switch4State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>warning</RkText>
              <RkSwitch
                rkType='warning'
                value={this.state.switch5State}
                onValueChange={(value) => this.setState({ switch5State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer]}>
            <View style={styles.componentRow}>
              <RkText>danger</RkText>
              <RkSwitch
                rkType='danger'
                value={this.state.switch6State}
                onValueChange={(value) => this.setState({ switch6State: value })}
              />
            </View>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Color customization</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkText>{
              "As in react-native's Switch it is possible to change onTintColor," +
              "'thumbTintColor' and 'tintColor' on both platforms." +
              ' The control allows you do that through rkTypes and props.'}
            </RkText>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>Example 1</RkText>
              <RkSwitch
                rkType='redTint'
                value={this.state.switch7State}
                onValueChange={(value) => this.setState({ switch7State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>Example 2</RkText>
              <RkSwitch
                thumbTintColor='yellow'
                value={this.state.switch8State}
                onValueChange={(value) => this.setState({ switch8State: value })}
              />
            </View>
          </View>

          <View style={[UtilStyles.columnContainer, UtilStyles.bordered]}>
            <View style={styles.componentRow}>
              <RkText>Example 3</RkText>
              <RkSwitch
                tintColor='purple'
                onTintColor='purple'
                value={this.state.switch9State}
                onValueChange={(value) => this.setState({ switch9State: value })}
              />
            </View>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Disabled control</RkText>
          <View style={[UtilStyles.columnContainer]}>
            <View style={styles.componentRow}>
              <RkText>I like UI Kitten!</RkText>
              <RkSwitch
                disabled={true}
                value={this.state.switch10State}
                onValueChange={(value) => this.setState({ switch10State: value })}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  componentRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
