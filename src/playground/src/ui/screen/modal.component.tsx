import React from 'react';
import {
  Text,
  View,
  Button,
  ViewProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Modal as ModalComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface ModalContentProps {
  onDismiss: () => void;
}

interface State {
  fadeModalVisible: boolean;
  slideModalVisible: boolean;
}

const ModalContent = (props: ModalContentProps & ViewProps): React.ReactElement<ViewProps> => (
  <View {...props}>
    <Text>Hi! I'm a modal</Text>
    <Button
      title='Dismiss'
      onPress={props.onDismiss}
    />
  </View>
);

class Modal extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Modal Component',
  };

  public state: State = {
    fadeModalVisible: false,
    slideModalVisible: false,
  };

  private onFadeButtonPress = () => {
    this.setState({ fadeModalVisible: true });
  };

  private onSlideButtonPress = () => {
    this.setState({ slideModalVisible: true });
  };

  private onFadeModalDismiss = () => {
    this.setState({ fadeModalVisible: false });
  };

  private onSlideModalDismiss = () => {
    this.setState({ slideModalVisible: false });
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <Button
          title='Fade'
          onPress={this.onFadeButtonPress}
        />
        <Button
          title='Slide Up'
          onPress={this.onSlideButtonPress}
        />
        <ModalComponent
          identifier='@modal/fade'
          visible={this.state.fadeModalVisible}
          style={this.props.themedStyle.modal}
          onCloseModal={this.onFadeModalDismiss}
          animationType='fade'
          animationDuration={600}>
          <ModalContent onDismiss={this.onFadeModalDismiss}/>
        </ModalComponent>
        <ModalComponent
          identifier='@modal/slide'
          visible={this.state.slideModalVisible}
          style={this.props.themedStyle.modal}
          isBackDropAllowed={true}
          onCloseModal={this.onSlideModalDismiss}
          animationType='slideInUp'
          animationDuration={600}>
          <ModalContent onDismiss={this.onSlideModalDismiss}/>
        </ModalComponent>
      </View>
    );
  }
}

export const ModalScreen = withStyles(Modal, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 4,
    top: 100,
    left: 50,
  },
}));
