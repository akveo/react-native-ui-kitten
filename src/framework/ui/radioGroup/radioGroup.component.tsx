import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as ChildProps } from '../radio/radio.component';

type Child = React.ReactElement<ChildProps>;

interface RadioGroupProps {
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children: Child | Child[];
}

export type Props = RadioGroupProps & StyledComponentProps & ViewProps;

export class RadioGroup extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: -1,
  };

  private onChildSelected = (index: number) => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private createChildrenArray = (source: Child | Child[]): Child[] => {
    return Array.isArray(source) ? source : [source];
  };

  // We need to apply Attributes props
  // because children provided by iterator should contain key prop

  private createChildProps = (props: ChildProps, index: number): ChildProps & React.Attributes => {
    return {
      ...props,
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onChildSelected(index),
    };
  };

  private renderChild = (element: Child, index: number): Child => {
    const props: ChildProps & React.Attributes = this.createChildProps(element.props, index);

    return React.cloneElement(element, props);
  };

  private renderChildren = (source: Child | Child[]): Child[] => {
    const children: Child[] = this.createChildrenArray(source);

    return children.map(this.renderChild);
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: {
        padding: style.padding,
      },
    };
  };

  render() {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View
        {...this.props}
        style={[componentStyle.container, this.props.style]}>
        {this.renderChildren(this.props.children)}
      </View>
    );
  }
}
