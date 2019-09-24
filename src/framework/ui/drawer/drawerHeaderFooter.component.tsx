import React from 'react';
import {
  ListItem,
  ListItemProps,
  ListItemElement,
} from '../list/listItem.component';

export type DrawerHeaderFooterProps = Partial<ListItemProps>;
export type DrawerHeaderFooterElement = ListItemElement;

export class DrawerHeaderFooter extends React.Component<DrawerHeaderFooterProps> {

  public render(): DrawerHeaderFooterElement {
    return (
      <ListItem {...this.props}/>
    );
  }
}
