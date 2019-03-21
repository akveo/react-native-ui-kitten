/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

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

/**
 * The `TopNavigationBarAction` component is a component that uses as
 * a control (part) of a `TopNavigationBar` component
 *
 * @extends React.Component
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon -
 * Determines icon of the component
 *
 * @property {boolean} isLastItem - Determines whether this item is the last one in AppBar.
 *
 * @property {() => void} onPress - Triggered on press.
 *
 * ### Usage
 *
 * @example Simple example
 *
 * ```tsx
 * <TopNavigationBarAction
 *   icon={(style: StyleType) => <Image source={{ uri: leftControlUri }} style={style}/>}
 *   onPress={() => props.navigation.goBack(null)}/>
 * ```
 * */

interface TopNavigationBarActionProps {
  icon: (style: StyleType) => React.ReactElement<ImageProps>;
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

  private getComponentStyle = (style: StyleType): StyleType => {
    const { marginRight, ...icon } = style;
    return {
      container: {
        marginRight: this.props.isLastItem ? 0 : marginRight,
        flex: 1,
      },
      icon: {
        ...icon,
      },
    };
  };

  private renderIcon(style: StyleType): React.ReactElement<ImageProps> {
    return this.props.icon(style);
  }

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          {...this.props}
          style={componentStyle.container}>
          {this.renderIcon(componentStyle.icon)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
