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
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebProps,
  TouchableWebElement,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type ListItemStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
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
 * `ListItem` is a support component for `List`.
 * The key feature of wrapping custom list items into `ListItem` component is that it automatically
 * picks background color fitting to current theme and responds to touches with feedback.
 *
 * @extends React.Component
 *
 * @property {string | (props: TextProps)} title - A string or a function component
 * to render within the item.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {string | (props: TextProps)} description - A string or a function component
 * to render within the item.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {ReactNode} children - A component to render within the item.
 * If provided, `title` and other props will be ignored.
 *
 * @property {(props: ImageProps, index: number) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ViewProps, index: number) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onPress - Called when component is pressed.
 * Note that `index` is provided.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ListItemSimpleUsage
 *
 * @overview-example ListItemWithIcon
 *
 * @overview-example ListItemWithAccessory
 *
 * @example ListItemWithExternalIcon
 *
 * @example ListItemInlineStyling
 */
export class ListItemComponent extends React.Component<ListItemProps & { index: number }> {

  static styledComponentName: string = 'ListItem';

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
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
      titleLineHeight,
      titleFontWeight,
      titleColor,
      descriptionFontFamily,
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
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor,
      },
      description: {
        color: descriptionColor,
        fontFamily: descriptionFontFamily,
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

  private renderTemplateChildren = (props: ListItemProps, evaStyle): React.ReactFragment => {
    return (
      <React.Fragment>
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryLeft}
        />
        <View
          key={1}
          style={styles.contentContainer}>
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
        {children || this.renderTemplateChildren({
          title,
          description,
          accessoryLeft,
          accessoryRight,
        }, evaStyle)}
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

export const ListItem = styled<ListItemProps>(ListItemComponent);
