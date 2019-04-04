import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {
  NavigationScreenProps,
  SafeAreaView,
} from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  TopNavigationBar,
  TopNavigationBarAction,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const leftControlUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-back.png';
const rightControlUri1: string = 'https://akveo.github.io/eva-icons/fill/png/128/at.png';
const rightControlUri2: string = 'https://akveo.github.io/eva-icons/fill/png/128/flash.png';

class TopNavigationBarScreen extends React.Component<Props> {

  static navigationOptions = {
    header: (props: NavigationScreenProps) => (
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigationBar
          appearance='titleCentered'
          title='Top Navigation Bar'
          subtitle='Subtitle'
          leftControl={
            <TopNavigationBarAction
              icon={(style: StyleType) => <Image source={{ uri: leftControlUri }} style={style}/>}
              onPress={() => props.navigation.goBack(null)}
            />
          }
          rightControls={[
            <TopNavigationBarAction
              icon={(style: StyleType) => <Image source={{ uri: rightControlUri1 }} style={style}/>}
              onPress={() => Alert.alert('On first right action')}
            />,
            <TopNavigationBarAction
              icon={(style: StyleType) => <Image source={{ uri: rightControlUri2 }} style={[
                style,
                styles.icon,
              ]}/>}
              onPress={() => Alert.alert('On second right action')}
            />,
          ]}
        />
      </SafeAreaView>
    ),
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Text>Top Navigation Bar Demo</Text>
      </View>
    );
  }
}

export default withStyles(TopNavigationBarScreen, (theme: ThemeType) => ({
  container: {
    padding: 22,
  },
}));

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#3366FF',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'red',
  },
});
