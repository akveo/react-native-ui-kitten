import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  RkText,
  RkTheme,
  RkTabView,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { ImageIcon } from '../components/imageIcon';

export class TabScreen extends React.Component {
  static navigationOptions = {
    title: 'Tabs',
  };

  state = {
    text: 'Tab 1 Selected',
  };

  onCustomTabChanged = (id) => {
    this.setState({ text: `Tab ${id + 1} Selected` });
  };

  renderMaterialTab = (selected, text, icon) => (
    <View style={{ alignItems: 'center', opacity: selected ? 1 : 0.7 }}>
      {icon}
      <RkText style={{ color: 'white', marginTop: 10 }}>{text}</RkText>
    </View>
  );

  renderCustomTab = (selected, text, iconName) => (
    <View
      style={{
        backgroundColor: selected ? RkTheme.current.colors.primary : 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 17,
      }}>
      <Icon
        style={{
          color: selected ? 'white' : RkTheme.current.colors.primary,
          fontSize: 16,
        }}
        name={iconName}
      />
      <RkText
        style={{
          color: selected ? 'white' : RkTheme.current.colors.primary,
          marginLeft: 11,
        }}>{text}
      </RkText>
    </View>
  );

  renderScrollableTab = (selected, text) => (
    <View
      style={{
          backgroundColor: selected ? RkTheme.current.colors.primary : 'white',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 17,
        }}>
      <RkText style={{ color: selected ? 'white' : RkTheme.current.colors.primary }}>{text}</RkText>
    </View>
  );

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Basic example</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView>
              <RkTabView.Tab title="Tab 1" />
              <RkTabView.Tab title="Tab 2" />
              <RkTabView.Tab title="Tab 3" />
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Material Theme Example</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView rkType="material" tabsUnderContent={true} index='1'>
              <RkTabView.Tab title="TAB 1">
                <Image source={require('../img/river.jpeg')} />
              </RkTabView.Tab>
              <RkTabView.Tab title="TAB 2">
                <Image source={require('../img/sea.jpg')} />
              </RkTabView.Tab>
              <RkTabView.Tab title="TAB 3">
                <Image source={require('../img/sun.jpg')} />
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <View>
            <RkTabView rkType="material">
              <RkTabView.Tab title={(selected) => this.renderMaterialTab(
                selected,
                'TAB 1',
                (<ImageIcon name='phone' />),
              )}
              />
              <RkTabView.Tab title={(selected) => this.renderMaterialTab(
                selected,
                'TAB 2',
                (<ImageIcon name='heart' />),
              )}
              />
              <RkTabView.Tab title={(selected) => this.renderMaterialTab(
                selected,
                'TAB 3',
                (<ImageIcon name='user' />),
              )}
              />
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>{this.state.text}</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView onTabChanged={this.onCustomTabChanged}>
              <RkTabView.Tab title={(selected) => this.renderCustomTab(selected, 'Tab 1', 'paw')} />
              <RkTabView.Tab
                title={(selected) => this.renderCustomTab(selected, 'Tab 2', 'leaf')}
              />
              <RkTabView.Tab
                title={(selected) => this.renderCustomTab(selected, 'Tab 3', 'rocket')}
              />
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Scrollable Header</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView rkType='noBorders' maxVisibleTabs={3}>
              <RkTabView.Tab
                title={(selected) => this.renderScrollableTab(selected, 'Tab 1', 'first')}
              />
              <RkTabView.Tab title={(selected) => this.renderScrollableTab(selected, 'Tab 2')} />
              <RkTabView.Tab title={(selected) => this.renderScrollableTab(selected, 'Tab 3')} />
              <RkTabView.Tab
                title={(selected) => this.renderScrollableTab(selected, 'Tab 4', 'last')}
              />
            </RkTabView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
});
