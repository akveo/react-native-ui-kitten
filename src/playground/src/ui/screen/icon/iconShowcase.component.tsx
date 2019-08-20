import React from 'react';
import { ViewProps } from 'react-native';
import {
  Icon,
  IconProps,
  Input,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  iconName: string;
}

const DEFAULT_ICON: string = 'star';

export class IconShowcase extends React.Component<IconProps, State> {

  private iconRef: React.RefObject<Icon<any>> = React.createRef();
  private animationTimeout: NodeJS.Timeout;

  public state: State = {
    iconName: DEFAULT_ICON,
  };

  public componentDidMount() {
    this.animationTimeout = setTimeout(this.startAnimation, 500);
  }

  public componentWillUnmount() {
    clearTimeout(this.animationTimeout);
  }

  private onInputChangeText = (text: string) => {
    this.state.iconName = text.length > 0 ? text : DEFAULT_ICON;
  };

  private onInputBlur = () => {
    this.iconRef.current.startAnimation();
  };

  private startAnimation = () => {
    this.iconRef.current.startAnimation();
  };

  private renderIcon = (style: StyleType) => {
    return (
      <Icon
        ref={this.iconRef}
        name={this.state.iconName}
        {...this.props}
        {...style}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    return (
      <Input
        style={{ flex: 1 }}
        placeholder='Type icon name'
        autoCapitalize='none'
        autoCorrect={false}
        caption='Unfocus to change icon'
        captionIcon={this.renderIcon}
        icon={this.renderIcon}
        onChangeText={this.onInputChangeText}
        onBlur={this.onInputBlur}
      />
    );
  }
}
