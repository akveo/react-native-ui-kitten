/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  Platform,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type ListItemStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface ListItemProps extends TouchableWebProps, ListItemStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  description?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<ViewProps>;
  children?: React.ReactNode;
}

export type ListItemElement = React.ReactElement<ListItemProps>;

/**
 * A single item rendered in List.
 * Items should be rendered within List by providing them through `renderItem` property to provide a usable component.
 *
 * @extends React.Component
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} description - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ViewProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 *
 * @property {ReactNode} children - Component to render within the item.
 * Useful when needed to render a custom item and get a feedback when it is pressed.
 * If provided, *title* and other properties will be ignored.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ListItemSimpleUsage
 *
 * @overview-example ListItemStyling
 * List Item and it's inner views can be styled by passing them as function components.
 *
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 * ```
 * import { ListItem, Text } from '@ui-kitten/components';
 *
 * <ListItem
 *   title={evaProps => <Text {...evaProps}>TITLE</Text>}
 *   description={evaProps => <Text {...evaProps}>DESCRIPTION</Text>}
 * />
 * ```
 */
@styled('ListItem')
export class ListItem extends React.Component<ListItemProps> {

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      titleMarginHorizontal,
      titleFontFamily,
      titleFontSize,
      titleFontWeight,
      titleColor,
      descriptionFontFamily,
      descriptionFontSize,
      descriptionFontWeight,
      descriptionColor,
      descriptionMarginHorizontal,
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
        marginHorizontal: titleMarginHorizontal,
        fontFamily: titleFontFamily,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        color: titleColor,
      },
      description: {
        color: descriptionColor,
        fontFamily: descriptionFontFamily,
        fontSize: descriptionFontSize,
        fontWeight: descriptionFontWeight,
        marginHorizontal: descriptionMarginHorizontal,
      },
      accessory: {
        marginHorizontal: accessoryMarginHorizontal,
      },
    };
  };

  private renderTemplateChildren = (props: ListItemProps, evaStyle): React.ReactFragment => {
    return (
      <React.Fragment>
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryLeft}
        />
        <View style={styles.contentContainer}>
          <FalsyText
            style={[evaStyle.title, styles.title]}
            component={props.title}
          />
          <FalsyText
            style={[evaStyle.description, styles.description]}
            component={props.description}
          />
        </View>
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryRight}
        />
      </React.Fragment>
    );
  };

  public render(): TouchableWebElement {
    const {
      eva,
      style,
      children,
      title,
      description,
      accessoryLeft,
      accessoryRight,
      ...touchableProps
    } = this.props;

    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, styles.container, webStyles.container, style]}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {children || this.renderTemplateChildren(this.props, evaStyle)}
      </TouchableWeb>
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
  title: {
    textAlign: 'left',
  },
  description: {
    textAlign: 'left',
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});
