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
import { toArray } from '../service/common.service';

type ChildElement = React.ReactElement<ChildProps>;

interface RadioGroupProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
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

  private createComponentChild = (element: ChildElement, index: number): ChildElement => {
    return React.cloneElement(element, {
      ...element.props,
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onChildSelected(index),
    });
  };

  private createComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return toArray(source).map(this.createComponentChild);
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: {
        padding: style.padding,
      },
    };
  };

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View
        {...this.props}
        style={[componentStyle.container, this.props.style]}>
        {this.createComponentChildren(this.props.children)}
      </View>
    );
  }
}
