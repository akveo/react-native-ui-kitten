import React from 'react';
import { IndexPath } from '../../devsupport';

export interface MenuItemDescriptor {
  index: IndexPath;
  groupIndices?: IndexPath[];
}

export class MenuService {

  public createDescriptorForElement = (element: React.ReactElement, index: number): MenuItemDescriptor => {
    const groupIndices = React.Children.map(element.props.children, ((child: React.ReactElement, section: number) => {
      return new IndexPath(index, section);
    }));

    return { groupIndices, index: new IndexPath(index) };
  };

  public createDescriptorForNestedElement = (element: React.ReactElement,
                                             groupDescriptor: MenuItemDescriptor,
                                             index: number): MenuItemDescriptor => {

    return {
      index: new IndexPath(groupDescriptor.index.row, index),
      groupIndices: null,
    };
  };
}
