import React from 'react';
import { ChildrenWithProps } from '../../devsupport';
import {
  CheckBox,
  CheckBoxElement,
  CheckBoxProps,
} from '../checkbox/checkbox.component';
import {
  SelectItem,
  SelectItemElement,
  SelectItemProps,
} from './selectItem.component';

export interface SelectGroupProps extends SelectItemProps {
  children?: ChildrenWithProps<SelectItemProps>;
}

export type SelectGroupElement = React.ReactElement<SelectItemProps>;

/**
 * A group of items displayed in Select.
 * Groups should be rendered within Select and contain SelectItem components to provide a useful component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[]} children -
 * items to be rendered within group.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
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
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example SelectWithGroups
 */
export class SelectGroup extends React.Component<SelectGroupProps> {

  private get isMultiSelect(): boolean {
    if (this.props.descriptor) {
      return this.props.descriptor.multiSelect;
    }
    return false;
  }

  private get groupAccessoryState(): CheckBoxProps {
    const nestedElements = React.Children.toArray(this.props.children) as SelectItemElement[];
    const selectedElements = nestedElements.filter(el => el.props.selected);

    const indeterminate: boolean = selectedElements.length > 0 && selectedElements.length < nestedElements.length;
    const checked: boolean = selectedElements.length === nestedElements.length;

    return { checked, indeterminate };
  }

  private get groupAccessoryProps(): CheckBoxProps {
    return {
      ...this.createAccessoryProps(this.props),
      ...this.groupAccessoryState,
    };
  }

  private createAccessoryProps = (props: SelectItemProps): CheckBoxProps => {
    return {
      checked: props.selected,
      onChange: () => props.onPress && props.onPress(props.descriptor),
    };
  };

  private createGroupedItemProps = (props: SelectItemProps): SelectItemProps => {
    const accessoryProps: CheckBoxProps = this.createAccessoryProps(props);
    return {
      appearance: 'grouped',
      accessoryLeft: evaProps => this.renderAccessory({ ...evaProps, ...accessoryProps }),
    };
  };

  private renderAccessory = (props: CheckBoxProps): CheckBoxElement => {
    if (!this.isMultiSelect) {
      return null;
    }

    return (
      <CheckBox {...props} />
    );
  };

  private renderGroupedItems = (source: ChildrenWithProps<SelectItemProps>): SelectItemElement[] => {
    return React.Children.map(source, (item: SelectItemElement, key: number): SelectItemElement => {
      const groupedProps: SelectItemProps = this.createGroupedItemProps(item.props);
      return React.cloneElement(item, { key, ...groupedProps, ...item.props });
    });
  };

  public render(): React.ReactElement {
    const { children, ...itemProps } = this.props;

    return (
      <React.Fragment>
        <SelectItem
          accessoryLeft={evaProps => this.renderAccessory({ ...evaProps, ...this.groupAccessoryProps })}
          {...itemProps}
        />
        {this.renderGroupedItems(children)}
      </React.Fragment>
    );
  }
}
