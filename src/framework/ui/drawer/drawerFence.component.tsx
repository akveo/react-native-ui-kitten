import React from 'react';
import {
  ListItem,
  ListItemProps,
  ListItemElement,
} from '../list/listItem.component';

export type DrawerFenceProps = Partial<ListItemProps>;
export type DrawerFenceElement = ListItemElement;

export class DrawerFence extends React.Component<DrawerFenceProps> {

  public render(): DrawerFenceElement {
    return (
      <ListItem {...this.props}/>
    );
  }
}
