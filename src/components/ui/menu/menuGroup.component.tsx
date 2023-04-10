import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ChildrenWithProps,
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
} from '../../devsupport';
import { ChevronDown } from '../shared/chevronDown.component';
import {
  MenuItem,
  MenuItemElement,
  MenuItemProps,
} from './menuItem.component';
import { MenuItemDescriptor } from './menu.service';

export interface MenuGroupProps extends MenuItemProps {
  children?: ChildrenWithProps<MenuItemProps>;
  initiallyExpanded?: boolean;
}

export type MenuGroupElement = React.ReactElement<MenuGroupProps>;

interface State {
  submenuHeight: number;
}

const CHEVRON_DEG_COLLAPSED = -180;
const CHEVRON_DEG_EXPANDED = 0;
const CHEVRON_ANIM_DURATION = 200;
const POSITION_OUTSCREEN: Point = Point.outscreen();

/**
 * A group of items displayed in Menu.
 * Groups should be rendered within Menu and contain MenuItem components to provide a useful navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children -
 * Items to be rendered within group.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the group.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {boolean} initiallyExpanded - Boolean value which defines whether group should be initially expanded.
 * If true - menu group will be expanded by default.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example MenuGroups
 */
export class MenuGroup extends React.Component<MenuGroupProps, State> {

  public state: State = {
    submenuHeight: 1,
  };

  private initiallyExpanded: boolean;

  private expandAnimation: Animated.Value = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.initiallyExpanded = props.initiallyExpanded;
  }

  public componentDidUpdate(prevProps: Readonly<MenuGroupProps>, prevState: Readonly<State>): void {
    const submenuHeightChanged = this.state.submenuHeight !== prevState.submenuHeight;
    if (submenuHeightChanged && this.hasSubmenu && this.initiallyExpanded) {
      this.expandAnimation.setValue(this.state.submenuHeight);
    }
  }

  private get hasSubmenu(): boolean {
    return React.Children.count(this.props.children) > 0;
  }

  private get shouldMeasureSubmenu(): boolean {
    return this.state.submenuHeight === 1;
  }

  private get expandAnimationValue(): number {
    // @ts-ignore - private api, but let's us avoid creating animation listeners.
    // `this.expandAnimation.addListener`
    return this.expandAnimation._value;
  }

  private get expandToRotateInterpolation(): Animated.AnimatedInterpolation<string> {
    return this.expandAnimation.interpolate({
      inputRange: [-this.state.submenuHeight, CHEVRON_DEG_EXPANDED],
      outputRange: [`${CHEVRON_DEG_COLLAPSED}deg`, `${CHEVRON_DEG_EXPANDED}deg`],
    });
  }

  private get submenuStyle(): ViewStyle {
    // @ts-ignore - issue of `@types/react-native` package
    return this.shouldMeasureSubmenu ? styles.outscreen : { height: this.expandAnimation };
  }

  private get defaultItemProps(): MenuItemProps {
    return { appearance: 'grouped' };
  }

  private onPress = (descriptor: MenuItemDescriptor, event: GestureResponderEvent): void => {
    if (this.hasSubmenu) {
      this.initiallyExpanded = false;

      const expandValue: number = this.expandAnimationValue > 0 ? 0 : this.state.submenuHeight;
      this.createExpandAnimation(expandValue).start();
      this.props.onPress?.(descriptor, event);
    }
  };

  private onSubmenuMeasure = (frame: Frame): void => {
    this.setState({ submenuHeight: frame.size.height });
  };

  private createExpandAnimation = (toValue: number): Animated.CompositeAnimation => {
    return Animated.timing(this.expandAnimation, {
      toValue: toValue,
      duration: CHEVRON_ANIM_DURATION,
      useNativeDriver: false,
    });
  };

  private renderAccessoryIfNeeded = (evaProps: Partial<ImageProps>): React.ReactElement => {
    if (!this.hasSubmenu) {
      return null;
    }

    const style = StyleSheet.flatten(evaProps.style);

    return (
      <Animated.View style={{ transform: [{ rotate: this.expandToRotateInterpolation }] }}>
        <ChevronDown
          {...evaProps}
          fill={style.tintColor as string}
        />
      </Animated.View>
    );
  };

  private renderItemsWithDefaultProps = (): React.ReactNode => {
    return React.Children.map(this.props.children, (item: MenuItemElement): MenuItemElement => {
      return React.cloneElement(item, this.defaultItemProps, null);
    });
  };

  private renderGroupedItems = (evaStyle): React.ReactElement<ViewProps> => {
    return (
      <Animated.View style={[styles.submenu, this.submenuStyle, evaStyle]}>
        {this.renderItemsWithDefaultProps()}
      </Animated.View>
    );
  };

  private renderMeasuringGroupedItems = (evaStyle): MeasuringElement => {
    return (
      <MeasureElement
        onMeasure={this.onSubmenuMeasure}
      >
        {this.renderGroupedItems(evaStyle)}
      </MeasureElement>
    );
  };

  private renderGroupedItemsIfNeeded = (evaStyle): React.ReactNode => {
    if (!this.hasSubmenu) {
      return null;
    }

    if (this.shouldMeasureSubmenu) {
      return this.renderMeasuringGroupedItems(evaStyle);
    }

    return this.renderGroupedItems(evaStyle);
  };

  public render(): React.ReactNode {
    const { children, ...itemProps } = this.props;

    return (
      <>
        <MenuItem
          accessoryRight={this.renderAccessoryIfNeeded}
          {...itemProps}
          onPress={this.onPress}
        />
        {this.renderGroupedItemsIfNeeded({})}
      </>
    );
  }
}

const styles = StyleSheet.create({
  outscreen: {
    position: 'absolute',
    left: POSITION_OUTSCREEN.x,
    top: POSITION_OUTSCREEN.y,
  },
  submenu: {
    overflow: 'hidden',
  },
});
