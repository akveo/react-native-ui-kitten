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
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const leftControlUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-back.png';
const rightControlUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';

class TopNavigationScreen extends React.Component<Props> {

  static navigationOptions = {
    header: (props: NavigationScreenProps) => {
      const renderLeftControl = (): React.ReactElement<TopNavigationActionProps> => {
        return (
          <TopNavigationAction
            icon={(style: StyleType) => <Image source={{ uri: leftControlUri }} style={style}/>}
            onPress={() => props.navigation.goBack(null)}
          />
        );
      };

      const renderRightControls = (): React.ReactElement<TopNavigationActionProps>[] => {
        return ([
          <TopNavigationAction
            icon={(style: StyleType) => <Image source={{ uri: rightControlUri }} style={style}/>}
            onPress={() => Alert.alert('On first right action')}
          />,
          <TopNavigationAction
            icon={(style: StyleType) => <Image source={{ uri: rightControlUri }} style={style}/>}
            onPress={() => Alert.alert('On second right action')}
          />,
        ]);
      };

      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TopNavigation
            title='Title'
            alignment='center'
            subtitle='Secondary Text'
            leftControl={renderLeftControl()}
            rightControls={renderRightControls()}
          />
        </SafeAreaView>
      );
    },
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Text>Top Navigation Bar Demo</Text>
      </View>
    );
  }
}

export default withStyles(TopNavigationScreen, (theme: ThemeType) => ({
  container: {
    padding: 22,
  },
}));

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
  },
});
