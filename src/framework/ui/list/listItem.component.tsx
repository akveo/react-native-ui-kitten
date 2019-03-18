import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  ImageProps,
  GestureResponderEvent,
  StyleSheet,
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
import { TouchableOpacityIndexedProps } from '../service/type';

interface ListDerivedProps {
  index?: number;
}

interface TemplateBaseProps {
  index: number;
  icon: (index: number, style: StyleType) => React.ReactElement<ImageProps>;
  accessory: (index: number, style: StyleType) => React.ReactElement<any>;
}

interface TemplateTitleProps extends Partial<TemplateBaseProps> {
  title: string;
  description?: string;
}

interface TemplateDescriptionProps extends Partial<TemplateBaseProps> {
  title?: string;
  description: string;
}

type ListItemProps = (TemplateTitleProps | TemplateDescriptionProps) & ListDerivedProps;

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = ListItemProps & StyledComponentProps & TouchableOpacityIndexedProps;

export class ListItem extends React.Component<Props> {

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event, this.props.index);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event, this.props.index);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event, this.props.index);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(event, this.props.index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      titleColor,
      titleFontSize,
      titleFontWeight,
      titleMarginHorizontal,
      titleMarginVertical,
      descriptionColor,
      descriptionFontSize,
      descriptionMarginHorizontal,
      descriptionMarginVertical,
      accessoryWidth,
      accessoryHeight,
      accessoryMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      title: {
        color: titleColor,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        marginHorizontal: titleMarginHorizontal,
        marginVertical: titleMarginVertical,
      },
      description: {
        color: descriptionColor,
        fontSize: descriptionFontSize,
        marginHorizontal: descriptionMarginHorizontal,
        marginVertical: descriptionMarginVertical,
      },
      accessory: {
        width: accessoryWidth,
        height: accessoryHeight,
        marginHorizontal: accessoryMarginHorizontal,
      },
    };
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    // @ts-ignore: will be not executed if `icon` prop is provided
    const { index, icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(index, style);

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
        style={[style, styles.title]}
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
        style={[style, styles.description]}>
        {description}
      </Text>
    );
  };

  private renderAccessoryElement = (style: StyleType): React.ReactElement<any> => {
    // @ts-ignore: will be not executed if `accessory` property is provided
    const { index, accessory } = this.props;

    const accessoryElement: React.ReactElement<any> = accessory(index, style);

    return React.cloneElement(accessoryElement, {
      key: 4,
      style: [accessoryElement.props.style, style, styles.accessory],
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

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderTemplateChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[container, style, styles.container]}
        activeOpacity={1.0}
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
