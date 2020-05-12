import React from 'react';
import { IndexPath } from '../../devsupport';
import { SelectItemElement } from './selectItem.component';

export interface SelectItemDescriptor {
  multiSelect: boolean;
  index: IndexPath;
  groupIndices?: IndexPath[];
}

const SEPARATOR: string = ', ';

export class SelectService {

  public selectItem = (multiSelect: boolean,
                       descriptor: SelectItemDescriptor,
                       selected: IndexPath[]): IndexPath | IndexPath[] => {

    if (multiSelect) {
      return this.createMultiSelectIndices(descriptor, selected);
    }
    return descriptor.index;
  };

  public toStringSelected = (selected: IndexPath[]): string => {
    if (!Array.isArray(selected)) {
      return '';
    }

    const options: string[] = selected.map((index: IndexPath): string => {
      return `Option ${index.toString()}`;
    });

    return options.join(SEPARATOR);
  };

  public isSelected = (descriptor: SelectItemDescriptor, selected: IndexPath[]): boolean => {
    if (descriptor.multiSelect && this.isGroup(descriptor)) {
      return this.containsSomeFromGroup(descriptor.index, selected);
    }
    return this.contains(descriptor.index, selected);
  };

  public isDisabled = (descriptor: SelectItemDescriptor): boolean => {
    return !descriptor.multiSelect && this.isGroup(descriptor);
  };

  public createDescriptorForElement = (element: SelectItemElement,
                                       multiSelect: boolean,
                                       index: number): SelectItemDescriptor => {

    const groupIndices = React.Children.map(element.props.children, ((child: SelectItemElement, row: number) => {
      return new IndexPath(row, index);
    }));

    return { multiSelect, groupIndices, index: new IndexPath(index) };
  };

  public createDescriptorForNestedElement = (element: SelectItemElement,
                                             descriptor: SelectItemDescriptor,
                                             index: number): SelectItemDescriptor => {

    return {
      ...descriptor,
      index: new IndexPath(index, descriptor.index.row),
      groupIndices: [],
    };
  };

  private createMultiSelectIndices = (descriptor: SelectItemDescriptor, selected: IndexPath[]): IndexPath[] => {
    const isIndexSelected: boolean = this.isSelected(descriptor, selected);
    return !isIndexSelected ? this.addIndex(descriptor, selected) : this.removeIndex(descriptor, selected);
  };

  private isGroup = (descriptor: SelectItemDescriptor): boolean => {
    return descriptor.groupIndices && descriptor.groupIndices.length > 0;
  };

  private createGroupIndices = (descriptor: SelectItemDescriptor): IndexPath[] => {
    return this.isGroup(descriptor) ? descriptor.groupIndices : [descriptor.index];
  };

  private addIndex = (descriptor: SelectItemDescriptor, selected: IndexPath[]): IndexPath[] => {
    return [...selected, ...this.createGroupIndices(descriptor)];
  };

  private removeIndex = (descriptor: SelectItemDescriptor, selected: IndexPath[]): IndexPath[] => {
    const groupIndices: IndexPath[] = this.createGroupIndices(descriptor);
    return selected.filter((selectedIndex: IndexPath): boolean => {
      return !this.contains(selectedIndex, groupIndices);
    });
  };

  private contains = (index: IndexPath, selected: IndexPath[]): boolean => {
    return selected.some((selectedIndex: IndexPath): boolean => {
      return selectedIndex.equals(index);
    });
  };

  private containsSomeFromGroup = (index: IndexPath, selected: IndexPath[]): boolean => {
    return selected.some((selectedIndex: IndexPath): boolean => {
      return selectedIndex.section === index.row;
    });
  };
}
