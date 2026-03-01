/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
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
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

export interface ListItemProps extends TouchableWebProps {
  /**
   * String, number or a function component to render within the item.
   * If it is a function, expected to return a Text.
   */
  title?: RenderProp<TextProps> | React.ReactText;
  /**
   * String, number or a function component to render within the item.
   * If it is a function, expected to return a Text.
   */
  description?: RenderProp<TextProps> | React.ReactText;
  /**
   * Function component to render to start of the text.
   * Expected to return an Image.
   */
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  /**
   * Function component to render to end of the text.
   */
  accessoryRight?: RenderProp<ViewProps>;
  /**
   * Component to render within the item.
   * Useful when needed to render a custom item and get a feedback when it is pressed.
   * If provided, *title* and other properties will be ignored.
   */
  children?: React.ReactNode;
  /**
   * Appearance of the component.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
}

export type ListItemElement = React.ReactElement<ListItemProps>;

type WebStyles = {
  container: StyleType;
};

/**
 * A single item rendered in List.
 * Items should be rendered within List by providing them through `renderItem` property to provide a usable component.
 *
 * @extends React.FC
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the item.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} description - String, number or a function
 * component to render within the item.
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
export const ListItem = React.forwardRef<TouchableWeb, ListItemProps>(
  (props, ref) => {
    const {
      appearance,
      style,
      children,
      title,
      description,
      accessoryLeft,
      accessoryRight,
      disabled,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      ...touchableProps
    } = props;

    const { style: evaStyle, dispatch } = useStyled('ListItem', {
      appearance,
      disabled,
    });

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
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
      } = evaStyle as StyleType;

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
    }, [evaStyle]);

    // Event handlers with dispatch
    const onPressIn = useCallback((event: GestureResponderEvent) => {
      dispatch([Interaction.ACTIVE]);
      onPressInProp?.(event);
    }, [dispatch, onPressInProp]);

    const onPressOut = useCallback((event: GestureResponderEvent) => {
      dispatch([]);
      onPressOutProp?.(event);
    }, [dispatch, onPressOutProp]);

    // Template children rendering
    const renderTemplateChildren = (): React.ReactElement => (
      <>
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryLeft}
        />
        <View style={staticStyles.contentContainer}>
          <FalsyText
            style={[componentStyle.title, staticStyles.title]}
            component={title}
          />
          <FalsyText
            style={[componentStyle.description, staticStyles.description]}
            component={description}
          />
        </View>
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryRight}
        />
      </>
    );

    return (
      <TouchableWeb
        ref={ref}
        {...touchableProps}
        disabled={disabled}
        style={[componentStyle.container, staticStyles.container, webStyles.container, style]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {children || renderTemplateChildren()}
      </TouchableWeb>
    );
  },
);

ListItem.displayName = 'ListItem';

const staticStyles = StyleSheet.create({
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

const webStyles = Platform.OS === 'web' && StyleSheet.create<WebStyles>({
  container: {
    outlineWidth: 0,
  },
});
