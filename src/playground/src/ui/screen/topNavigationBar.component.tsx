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
import {
  TopNavigationBar as TopNavigationBarComponent,
  TopNavigationBarAction,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const APPEARANCE: string = 'title-centered';

const leftControlUri: string = 'https://pngimage.net/wp-content/uploads/2018/05/back-icon-png-6.png';
const rightControlUri1: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLai-QccSTB98vmP7dUigtL8F13cE6_0mmju_1m4mDQgzLd_Zq';
const rightControlUri2: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt6ezD4tiscqX5g4AFKa0vFC0z7rLTlAJn53Jl65uZ5JfPq4Ot';

class TopNavigationBar extends React.Component<Props> {

  static navigationOptions = {
    header: (props: NavigationScreenProps) => (
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigationBarComponent
          appearance={APPEARANCE}
          title='Top Navigation Bar'
          subtitle='Subtitle'
          leftControl={
            <TopNavigationBarAction
              iconSource={{ uri: leftControlUri }}
              onPress={() => props.navigation.goBack(null)}
            />
          }
          rightControls={[
            <TopNavigationBarAction
              iconSource={{ uri: rightControlUri1 }}
              onPress={() => Alert.alert('On first right action')}
            />,
            <TopNavigationBarAction
              iconSource={{ uri: rightControlUri2 }}
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

export const TopNavigationBarScreen = withStyles(TopNavigationBar, (theme: ThemeType) => ({
  container: {
    padding: 22,
  },
}));

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#3366FF',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
