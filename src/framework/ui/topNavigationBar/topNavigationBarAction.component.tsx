import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ImageProps,
  View,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TopNavigationBarActionProps {
  icon: (width: number, height: number, color: string) => React.ReactElement<ImageProps>;
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
      marginRight: this.props.isLastItem ? 0 : style.marginRight,
    },
    icon: {
      flex: 1,
      ...style.icon,
    },
  });

  private renderIcon(style: StyleType): React.ReactElement<ImageProps> {
    return this.props.icon(style.width, style.height, style.color);
  }

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          {...this.props}
          style={[componentStyle.container, this.props.style]}>
          {this.renderIcon(componentStyle.icon)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
