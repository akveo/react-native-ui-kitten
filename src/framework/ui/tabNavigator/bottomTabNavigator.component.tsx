import React from 'react';
import {
  Dimensions,
  View,
  ViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  TabBarIndicator,
  Props as TabBarIndicatorProps,
} from '../tab/tabBarIndicator.component';
import { Props as ChildProps } from './bottomNavigatorTab.component';
import { toArray } from '../service/common.service';

type ChildElement = React.ReactElement<ChildProps>;

interface TabNavigatorProps {
  appearance?: string;
  selectedIndex?: number;
  children: ChildElement | ChildElement[];
  onSelect?: (index: number) => void;
}

export type Props = TabNavigatorProps & StyledComponentProps & ViewProps;

export class BottomTabNavigator extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      showText: style.showText,
      showHighlight: style.showHighlight,
      container: {
        backgroundColor: style.backgroundColor,
        borderTopColor: style.borderTopColor,
        borderTopWidth: style.borderTopWidth,
        paddingVertical: style.paddingVertical,
      },
      highlight: {
        height: style.highlightHeight,
        backgroundColor: style.selectedColor,
      },
    };
  };

  public onSelect = (index: number): void => {
    if (this.props.selectedIndex !== index) {
      this.props.onSelect && this.props.onSelect(index);
    }
  };

  private getComponentChild(item: ChildElement, index: number): ChildElement {
    const component: ChildElement = React.cloneElement(item, {
      isSelected: this.props.selectedIndex === index,
    });

    return (
      <TouchableWithoutFeedback
        {...item.props}
        onPress={() => this.onSelect(index)}
        key={index}
      >
        {component}
      </TouchableWithoutFeedback>
    );
  }

  private getNavigatorChildren(items: ChildElement | ChildElement[]): ChildElement[] {
    return toArray(items).map((item: ChildElement, index: number) =>
      this.getComponentChild(item, index));
  }

  private renderHighlight(showHighlight: boolean,
                          style: StyleType,
                          positions: number): React.ReactElement<TabBarIndicatorProps> {

    return showHighlight ?
      (
        <TabBarIndicator
          style={style}
          selectedPosition={this.props.selectedIndex}
          positions={positions}
        />
      ) : null;
  }

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const children: ChildElement[] = this.getNavigatorChildren(this.props.children);

    return (
      <View
        {...this.props}
        style={[styles.container, componentStyle.container, this.props.style]}
      >
        {this.renderHighlight(
          componentStyle.showHighlight,
          { ...componentStyle.highlight, ...styles.highlight },
          children.length,
        )}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  highlight: {
    position: 'absolute',
  },
});
