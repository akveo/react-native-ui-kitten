import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  NavigationScreenProps,
  SafeAreaView,
} from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { TopNavigationBar as TopNavigationBarComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

class TopNavigationBar extends React.Component<Props> {

  static navigationOptions = {
    header: (props: NavigationScreenProps) => (
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigationBarComponent
          appearance='title-centered-subtitle'
          title='Top Navigation Bar'
          subtitle='Subtitle'
          leftControl={<View style={styles.circle}/>}
          rightControls={[<View style={styles.square}/>, <View style={styles.rectangle}/>]}
          onLeftControl={() => props.navigation.goBack(null)}
          onRightControls={[
            () => Alert.alert('On first right control'),
            () => Alert.alert('On second right control'),
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

export const TopNavigationBarScreen = withStyles(TopNavigationBar, (theme: ThemeType) => ({
  container: {
    padding: 22,
  },
}));

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#3366FF',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  square: {
    width: 20,
    height: 20,
  },
  rectangle: {
    width: 30,
    height: 20,
  },
});
