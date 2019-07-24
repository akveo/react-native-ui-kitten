import React from 'react';
import {
  ListItem,
  ListItemProps,
} from '../list/listItem.component';

export type DrawerItemProps = ListItemProps;
export type DrawerItemElement = React.ReactElement<DrawerItemProps>;

/**
 * DrawerItem is a support component for Drawer.
 * The key feature of wrapping custom list items into DrawerItem component is that it automatically
 * picks background color fitting to current theme and responds to touches with feedback.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the DrawerItem.
 *
 * @property {string} description - Determines the description of the DrawerItem's title.
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
 * import React from 'react'
 * import { DrawerItem } from 'react-native-ui-kitten';
 *
 * export const DrawerItemShowcase = (props) => (
 *   <DrawerItem
 *     title='Title'
 *     description='Description'
 *   />
 * );
 * ```
 *
 * @overview-example Icon
 *
 * ```
 * import React from 'react'
 * import { Image } from 'react-native'
 * import { DrawerItem } from 'react-native-ui-kitten';
 *
 * const EmailIcon = (style) => (
 *   <Image style={style} source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/email.png' }}/>
 * );
 *
 * export const DrawerItemShowcase = (props) => (
 *   <DrawerItem title='Title' icon={EmailIcon} />
 * );
 * ```
 *
 * @overview-example Accessory View
 *
 * ```
 * import React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { DrawerItem, Text } from 'react-native-ui-kitten';
 *
 * const NotificationBadge = (style) => (
 *  <View style={[style, styles.badge]}>
 *    <Text>NEW</Text>
 *  </View>
 * );
 *
 * export const DrawerItemShowcase = (props) => {
 *
 *   return (
 *     <DrawerItem
 *       title='Messages'
 *       accessory={NotificationBadge}
 *     />
 *   );
 * };
 *
 * const styles = StyleSheet.create({
 *   badge: {
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     height: 24,
 *     paddingHorizontal: 24,
 *     borderRadius: 12,
 *     backgroundColor: 'orange',
 *   },
 * });
 * ```
 */
export class DrawerItem extends React.Component<DrawerItemProps> {

  public render(): React.ReactElement<ListItemProps> {
    return (
      <ListItem {...this.props}/>
    );
  }
}
