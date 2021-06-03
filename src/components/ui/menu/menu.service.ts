import React from 'react';
import { IndexPath } from '../../devsupport';

export interface MenuItemDescriptor {
  index: IndexPath;
  groupIndices?: IndexPath[];
}

export class MenuService {

  public createDescriptorForElement = (element: React.ReactElement, index: number): MenuItemDescriptor => {
    const groupIndices = React.Children.map(element.props.children, ((child: React.ReactElement, row: number) => {
      return new IndexPath(row, index);
    }));

    return { groupIndices, index: new IndexPath(index) };
  };

  public createDescriptorForNestedElement = (groupDescriptor: MenuItemDescriptor, index: number): MenuItemDescriptor => {

    return {
      index: new IndexPath(index, groupDescriptor.index.row),
      groupIndices: null,
    };
  };
}
