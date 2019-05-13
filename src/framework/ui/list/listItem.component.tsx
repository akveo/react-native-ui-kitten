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
  Image,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import {
  Text,
  TextProps,
} from '../text/text.component';
import { TouchableIndexedProps } from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
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
  title: React.ReactText;
  description?: React.ReactText;
  titleStyle?: StyleProp<TextStyle>;
}

interface TemplateDescriptionProps extends TemplateBaseProps {
  title?: React.ReactText;
  description: React.ReactText;
  descriptionStyle?: StyleProp<TextStyle>;
}

interface CustomContentProps {
  children?: React.ReactNode;
}

type ComponentProps = (TemplateTitleProps | TemplateDescriptionProps | CustomContentProps) & ListDerivedProps;

export type ListItemProps = StyledComponentProps & TouchableIndexedProps & ComponentProps;

class ListItemComponent extends React.Component<ListItemProps> {

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
    const { style, titleStyle, descriptionStyle } = this.props;

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
        ...StyleSheet.flatten(style),
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
        ...styles.title,
        ...StyleSheet.flatten(titleStyle),
      },
      description: {
        color: descriptionColor,
        fontSize: descriptionFontSize,
        lineHeight: descriptionLineHeight,
        marginHorizontal: descriptionMarginHorizontal,
        ...styles.description,
        ...StyleSheet.flatten(descriptionStyle),
      },
      accessory: {
        marginHorizontal: accessoryMarginHorizontal,
        ...styles.accessory,
      },
    };
  };

  private renderIconElement = (style: StyleType): IconElement => {
    // @ts-ignore: will be not executed if `icon` prop is provided
    const { index, icon } = this.props;

    const iconElement: IconElement = icon(style, index);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const [titleElement, descriptionElement] = this.renderContentElementChildren(style);

    return (
      <View
        key={1}
        style={styles.contentContainer}>
        {titleElement}
        {descriptionElement}
      </View>
    );
  };

  private renderTitleElement = (style: StyleType): TextElement => {
    // @ts-ignore: will be not executed if `title` property is provided
    const { title } = this.props;

    return (
      <Text
        key={2}
        style={style}>
        {title}
      </Text>
    );
  };

  private renderDescriptionElement = (style: StyleType): TextElement => {
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

  private renderAccessoryElement = (style: StyleType): AccessoryElement => {
    // @ts-ignore: will be not executed if `accessory` property is provided
    const { index, accessory } = this.props;

    const accessoryElement: AccessoryElement = accessory(style, index);

    return React.cloneElement(accessoryElement, {
      key: 4,
      style: [style, accessoryElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNodeArray => {
    // @ts-ignore: will be not executed if any of properties below is provided
    const { title, description } = this.props;

    return [
      title && this.renderTitleElement(style.title),
      description && this.renderDescriptionElement(style.description),
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
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={container}
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

export const ListItem = styled<ListItemProps>(ListItemComponent);
