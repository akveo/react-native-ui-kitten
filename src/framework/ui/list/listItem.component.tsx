/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  ImageProps,
  GestureResponderEvent,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import { TouchableOpacityIndexedProps } from '../common/type';

interface ListDerivedProps {
  index?: number;
}

interface TemplateBaseProps {
  index: number;
  icon: (style: StyleType, index: number) => React.ReactElement<ImageProps>;
  accessory: (style: StyleType, index: number) => React.ReactElement<any>;
}

interface TemplateTitleProps extends Partial<TemplateBaseProps> {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
}

interface TemplateDescriptionProps extends Partial<TemplateBaseProps> {
  title?: string;
  description: string;
  descriptionStyle?: StyleProp<TextStyle>;
}

interface CustomContentProps {
  children?: React.ReactNode;
}

type ListItemProps = (TemplateTitleProps | TemplateDescriptionProps | CustomContentProps) & ListDerivedProps;

const Text = styled<TextProps>(TextComponent);

export type Props = ListItemProps & StyledComponentProps & TouchableOpacityIndexedProps;

/**
 * The `ListItem` component is the "support" component for List.
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
 * @property {number} index - Determines index of the ListItem.
 *
 * @property {(style: StyleType, index: number) => React.ReactElement<any>} accessory - Determines the accessory of the
 * component.
 *
 * @property {(style: StyleType, index: number) => React.ReactElement<ImageProps>} icon - Determines the icon of the
 * component.
 *
 * @example ListItem usage and API example
 *
 * ```
 * import { ListItem } from '@kitten/ui';
 *
 * private renderItem = (info: ListRenderItemInfo<ListItemModel>): React.ReactElement<ListItemProps> => {
 *    const { item, index } = info;
 *    const Icon = (style: StyleType, index: number): React.ReactElement<ImageProps> => (
 *      <Image source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}/>
 *    );
 *
 *    const Accessory = (style: StyleType, index: number): React.ReactElement<CheckBoxProps> => (
 *      <CheckBox checked={index % 2 === 0}/>
 *    );
 *
 *    return (
 *      <ListItem
 *        title={`${item.title} ${index + 1}`}
 *        description={item.description}
 *        icon={Icon}
 *        accessory={Accessory}
 *        onPress={this.onItemPress}
 *      />
 *    );
 *  };
 * ```
 * */

export class ListItem extends React.Component<Props> {

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
    // @ts-ignore: will be not executed if `titleStyle` and `descriptionStyle` properties are provided
    const { titleStyle, descriptionStyle } = this.props;
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
      descriptionLineHeight,
      descriptionColor,
      descriptionMarginHorizontal,
      accessoryMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      title: {
        marginHorizontal: titleMarginHorizontal,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor,
        ...StyleSheet.flatten(titleStyle),
        ...styles.title,
      },
      description: {
        color: descriptionColor,
        fontSize: descriptionFontSize,
        lineHeight: descriptionLineHeight,
        marginHorizontal: descriptionMarginHorizontal,
        ...StyleSheet.flatten(descriptionStyle),
        ...styles.description,
      },
      accessory: {
        marginHorizontal: accessoryMarginHorizontal,
        ...styles.accessory,
      },
    };
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    // @ts-ignore: will be not executed if `icon` prop is provided
    const { index, icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(style, index);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, iconElement.props.style, styles.icon],
    });
  };

  private renderContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const contentChildren: React.ReactNode = this.renderContentElementChildren(style);

    return (
      <View
        key={1}
        style={[style, styles.contentContainer]}>
        {contentChildren}
      </View>
    );
  };

  private renderTitleElement = (style: StyleType): React.ReactElement<TextProps> => {
    // @ts-ignore: will be not executed if `title` property is provided
    const { title } = this.props;

    return (
      <Text
        style={style}
        key={2}>
        {title}
      </Text>
    );
  };

  private renderDescriptionElement = (style: StyleType): React.ReactElement<TextProps> => {
    // @ts-ignore: will be not executed if `description` property is provided
    const { description } = this.props;

    return (
      <Text
        key={3}
        style={style}>
        {description}
      </Text>
    );
  };

  private renderAccessoryElement = (style: StyleType): React.ReactElement<any> => {
    // @ts-ignore: will be not executed if `accessory` property is provided
    const { index, accessory } = this.props;

    const accessoryElement: React.ReactElement<any> = accessory(style, index);

    return React.cloneElement(accessoryElement, {
      key: 4,
      style: [style, accessoryElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNode => {
    // @ts-ignore: will be not executed if any of properties below is provided
    const { title, description } = this.props;

    return [
      title ? this.renderTitleElement(style.title) : undefined,
      description ? this.renderDescriptionElement(style.description) : undefined,
    ];
  };

  private renderTemplateChildren = (style: StyleType): React.ReactNode => {
    // @ts-ignore: following props could not be provided
    const { icon, title, description, accessory } = this.props;

    return [
      icon ? this.renderIconElement(style.icon) : undefined,
      title || description ? this.renderContentElement(style) : undefined,
      accessory ? this.renderAccessoryElement(style.accessory) : undefined,
    ];
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { children } = this.props;

    return children ? children : this.renderTemplateChildren(style);
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={[container, style]}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon: {},
  title: {},
  description: {},
  accessory: {},
});
