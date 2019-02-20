import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TopNavigationBarActionProps {
  iconSource: ImageSourcePropType;
  isLastItem?: boolean;
  onPress?: () => void;
}

export type Props = StyledComponentProps & TouchableWithoutFeedbackProps & TopNavigationBarActionProps;

export class TopNavigationBarAction extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    isLastItem: false,
  };

  public onPress = (): void => {
    this.props.onPress && this.props.onPress();
  };

  private getComponentStyle = (style: StyleType): StyleType => ({
    container: {
      width: style.width,
      height: style.height,
      marginRight: this.props.isLastItem ? 0 : style.marginRight,
    },
  });

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          {...this.props}
          style={[componentStyle.container, this.props.style]}>
          <Image style={styles.image} source={this.props.iconSource}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
