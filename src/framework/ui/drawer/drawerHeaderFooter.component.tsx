import React from 'react';
import {
  ListItem,
  ListItemProps,
  ListItemElement,
} from '../list/listItem.component';

export type DrawerHeaderFooterProps = Partial<ListItemProps>;
export type DrawerHeaderFooterElement = ListItemElement;

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
 * @property {React.ReactNode} children - Determines React Children of the component.
 *
 * @property {(style: StyleType, index: number) => React.ReactElement<any>} accessory - Determines the accessory of the
 * component.
 *
 * @property {(style: StyleType, index: number) => React.ReactElement<ImageProps>} icon - Determines the icon of the
 * component.
 *
 * @property {(index: number, event: GestureResponderEvent) => React.ReactElement<ImageProps>} onPress - Emits when
 * component is pressed.
 *
 * @overview-example Simple Usage
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react'
 * import { DrawerHeaderFooter, Icon } from 'react-native-ui-kitten';
 *
 * const ProfileIcon = (style) => (
 *   <Icon {...style} name='person' />
 * );
 *
 * export const ProfileHeader = (props) => (
 *   <DrawerHeaderFooter title='John Doe' description='React Native Developer' icon={ProfileIcon} />
 * );
 * ```
 *
 * @example With Icon
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react'
 * import { DrawerHeaderFooter, Icon } from 'react-native-ui-kitten';
 *
 * const ProfileIcon = (style) => (
 *   <Icon {...style} name='person' />
 * );
 *
 * export const ProfileHeader = (props) => (
 *   <DrawerHeaderFooter title='John Doe' description='React Native Developer' icon={ProfileIcon} />
 * );
 * ```
 *
 * @example With Accessory
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react'
 * import { DrawerHeaderFooter, Icon } from 'react-native-ui-kitten';
 *
 * const LogoutIcon = (style) => (
 *   <Icon {...style} name='log-out' />
 * );
 *
 * const LogoutButton = (style): React.ReactElement<ButtonProps> => (
 *   <Button style={style} icon={LogoutIcon}>LOGOUT</Button>
 * );
 *
 * export const ProfileHeader = (props) => (
 *   <DrawerHeaderFooter
 *     title='John Doe'
 *     description='React Native Developer'
 *     accessory={LogoutButton}
 *   />
 * );
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react'
 * import { DrawerHeaderFooter } from 'react-native-ui-kitten';
 *
 * export const ProfileHeader = (props) => (
 *   <DrawerHeaderFooter
 *     style={styles.drawerHeader}
 *     titleStyle={styles.drawerHeaderTitle}
 *     descriptionStyle={styles.drawerHeaderDescription}
 *     title='John Doe'
 *     description='React Native Developer'
 *   />
 * );
 * ```
 */
export class DrawerHeaderFooter extends React.Component<DrawerHeaderFooterProps> {

  public render(): DrawerHeaderFooterElement {
    return (
      <ListItem {...this.props} />
    );
  }
}
