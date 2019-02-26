import React from 'react';
import {
  View,
  Button,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
  ModalService,
  ModalComponentCloseProps,
} from '@kitten/theme';
import { NavigationScreenProps } from 'react-navigation';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface EndlessModalProps {
  onContinue?: () => void;
  onDismiss?: () => void;
}

const EndlessModal = (props?: EndlessModalProps & ModalComponentCloseProps & ViewProps) => {

  const { onContinue, onDismiss, onCloseModal, ...derivedProps } = props;

  const onCloseButtonPress = () => {
    if (onDismiss) {
      onDismiss();
    }
    onCloseModal();
  };

  return (
    <View {...derivedProps}>
      <Button
        title='Next'
        onPress={onContinue}
      />
      <Button
        title='Close'
        onPress={onCloseButtonPress}
      />
    </View>
  );
};

class Dialog extends React.Component<Props> {

  static navigationOptions = {
    title: 'Dialog',
  };

  private modalCount: number = 0;

  private onNext = (): void => {
    this.modalCount += 1;

    const component = this.createModalElement();
    ModalService.showDialog(component, true);
  };

  private onClose = (): void => {
    this.modalCount -= 1;
  };

  private createModalElement = (): React.ReactElement<any> => {
    const color: string = this.modalCount % 2 === 0 ? '#C0C0C0' : '#A0A1A8';

    const additionalProps: ViewStyle = {
      left: this.modalCount * 20,
      top: 140 + this.modalCount * 20,
      backgroundColor: color,
    };

    return (
      <EndlessModal
        style={[this.props.themedStyle.modal, additionalProps]}
        onContinue={this.onNext}
        onDismiss={this.onClose}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <View>
        <Button
          onPress={this.onNext}
          title='Click me!'
        />
      </View>
    );
  }
}

export const DialogScreen = withStyles(Dialog, (theme: ThemeType) => {
  return {
    modal: {
      width: 128,
      height: 128,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});
