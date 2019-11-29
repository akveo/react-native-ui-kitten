import React from 'react';
import {
  ListItem,
  ListItemProps,
} from '../list/listItem.component';

export type DrawerHeaderFooterProps = Partial<ListItemProps>;
export type DrawerHeaderFooterElement = React.ReactElement<DrawerHeaderFooterProps>;

/**
 * `DrawerHeaderFooter` is a support component for `Drawer`.
 * Designed to be used as Header or Footer of `Drawer`.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the DrawerHeaderFooter.
 *
 * @property {string} description - Determines the description of the DrawerHeaderFooter's title.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {StyleProp<TextStyle>} descriptionStyle - Customizes description style.
 *
 * @property {ReactNode} children - Determines React Children of the component.
 *
 * @property {(style: StyleType, index: number) => ReactElement} accessory - Determines the accessory of the
 * component.
 *
 * @property {(style: ImageStyle, index: number) => ReactElement} icon - Determines the icon of the
 * component.
 *
 * @property {(index: number, event: GestureResponderEvent) => ReactElement<ImageProps>} onPress - Emits when
 * component is pressed.
 *
 * @property {ListItemProps} ...ListItemProps - Any props applied to ListItem component.
 *
 * @overview-example DrawerHeaderFooterSimpleUsage
 *
 * @overview-example DrawerHeaderFooterWithAccessory
 *
 * @example DrawerHeaderFooterWithExternalSourceIcon
 *
 * @example DrawerHeaderFooterInlineStyling
 */
export class DrawerHeaderFooter extends React.Component<DrawerHeaderFooterProps> {

  public render(): DrawerHeaderFooterElement {
    return (
      <ListItem {...this.props} />
    );
  }
}
