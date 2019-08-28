/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { TouchableIndexedProps } from '../support/typings';
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ImageProps>;
type AccessoryElement = React.ReactElement<any>;
type IconProp = (style: StyleType, index: number) => IconElement;
type AccessoryProp = (style: StyleType, index: number) => AccessoryElement;

interface ListDerivedProps {
  index?: number;
}

interface TemplateBaseProps {
  icon?: IconProp;
  accessory?: AccessoryProp;
}

interface TemplateTitleProps extends TemplateBaseProps {
  title: string;
  description?: string;
  titleStyle?: StyleProp<TextStyle>;
}

interface TemplateDescriptionProps extends TemplateBaseProps {
  title?: string;
  description: string;
  descriptionStyle?: StyleProp<TextStyle>;
}

interface CustomContentProps {
  children?: React.ReactNode;
}

type ComponentProps = (TemplateTitleProps | TemplateDescriptionProps | CustomContentProps) & ListDerivedProps;

export type ListItemProps = StyledComponentProps & TouchableIndexedProps & ComponentProps;
export type ListItemElement = React.ReactElement<ListItemProps>;

/**
 * `ListItem` is a support component for `List`.
 * The key feature of wrapping custom list items into `ListItem` component is that it automatically
 * picks background color fitting to current theme and responds to touches with feedback.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the ListItem.
 *
 * @property {string} description - Determines the description of the ListItem's title.
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
 * import { ListItem, ListItemProps } from 'react-native-ui-kitten';
 *
 * export const ListItemShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
 *
 *   return (
 *     <ListItem
 *       title='Title'
 *       description='Description'
 *     />
 *   );
 *  };
 * ```
 *
 * @example With Icon
 *
 * ```
 * import React from 'react'
 * import { Image, ImageProps } from 'react-native'
 * import { ListItem, ListItemProps, StyleType } from 'react-native-ui-kitten';
 *
 * export const ListItemShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
 *
 *   const Icon = (style: StyleType): React.ReactElement<ImageProps> => {
 *     return (
 *       <Image style={style} source={{uri: 'https://path-to/awesome-image.png'}}/>
 *     );
 *   };
 *
 *   return (
 *     <ListItem
 *       title='Title'
 *       description='Description'
 *       icon={Icon}
 *     />
 *   );
 *  };
 * ```
 *
 * @example With Accessory
 *
 * ```
 * import React from 'react'
 * import { ListItem, ListItemProps, Button, ButtonProps, StyleType } from 'react-native-ui-kitten';
 *
 * export const ListItemShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
 *
 *   const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
 *     return (
 *       <Button style={style}>BUTTON</Button>
 *     );
 *   };
 *
 *   return (
 *     <ListItem
 *       title='Title'
 *       description='Description'
 *       accessory={Accessory}
 *     />
 *   );
 * };
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react'
 * import { ListItem, ListItemProps } from 'react-native-ui-kitten';
 *
 * export const ListItemShowcase = (props?: ListItemProps): React.ReactElement<ListItemProps> => {
 *
 *   return (
 *     <ListItem
 *       style={styles.listItem}
 *       titleStyle={styles.listItemTitle}
 *       descriptionStyle={styles.listItemDescription}
 *       title='Title'
 *       description='Description'
 *     />
 *   );
 * };
 * ```
 * */

export class ListItemComponent extends React.Component<ListItemProps> {

  static styledComponentName: string = 'ListItem';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(this.props.index, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props.index, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props.index, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.index, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      titleMarginHorizontal,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleColor,
      descriptionFontSize,
      descriptionFontWeight,
      descriptionLineHeight,
      descriptionColor,
      descriptionMarginHorizontal,
      accessoryMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      contentContainer: {},
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      title: {
        marginHorizontal: titleMarginHorizontal,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor,
      },
      description: {
        color: descriptionColor,
        fontSize: descriptionFontSize,
        fontWeight: descriptionFontWeight,
        lineHeight: descriptionLineHeight,
        marginHorizontal: descriptionMarginHorizontal,
      },
      accessory: {
        marginHorizontal: accessoryMarginHorizontal,
      },
    };
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    // @ts-ignore: will be not executed if `icon` prop is provided
    const { index, icon } = this.props;

    const iconElement: IconElement = icon(style, index);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const { contentContainer, ...contentStyles } = style;
    const [titleElement, descriptionElement] = this.renderContentElementChildren(contentStyles);

    return (
      <View
        key={1}
        style={[contentContainer, styles.contentContainer]}>
        {titleElement}
        {descriptionElement}
      </View>
    );
  };

  private renderTitleElement = (style: StyleType): TextElement => {
    // @ts-ignore: will be not executed if `title` property is provided
    const { title, titleStyle } = this.props;

    return (
      <Text
        key={2}
        style={[style, styles.title, titleStyle]}>
        {title}
      </Text>
    );
  };

  private renderDescriptionElement = (style: StyleType): TextElement => {
    // @ts-ignore: will be not executed if `description` property is provided
    const { description, descriptionStyle } = this.props;

    return (
      <Text
        key={3}
        style={[style, styles.description, descriptionStyle]}>
        {description}
      </Text>
    );
  };

  private renderAccessoryElement = (style: StyleType): AccessoryElement => {
    // @ts-ignore: will be not executed if `accessory` property is provided
    const { index, accessory } = this.props;

    const accessoryElement: AccessoryElement = accessory(style, index);

    return React.cloneElement(accessoryElement, {
      key: 4,
      style: [style, styles.accessory, accessoryElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNodeArray => {
    // @ts-ignore: will be not executed if any of properties below is provided
    const { title, description } = this.props;

    return [
      isValidString(title) && this.renderTitleElement(style.title),
      isValidString(description) && this.renderDescriptionElement(style.description),
    ];
  };

  private renderTemplateChildren = (style: StyleType): React.ReactNodeArray => {
    // @ts-ignore: following props could not be provided
    const { icon, title, description, accessory } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      (title || description) && this.renderContentElement(style),
      accessory && this.renderAccessoryElement(style.accessory),
    ];
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { children } = this.props;

    return children ? children : this.renderTemplateChildren(style);
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={[container, styles.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon: {},
  title: {
    textAlign: 'left',
  },
  description: {
    textAlign: 'left',
  },
  accessory: {},
});

export const ListItem = styled<ListItemProps>(ListItemComponent);
