/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  EvaStatus,
  FalsyFC,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import { Divider } from '../divider/divider.component';

type TouchableWebPropsWithoutChildren = Omit<TouchableWebProps, 'children'>;

export interface CardProps extends TouchableWebPropsWithoutChildren {
  children?: React.ReactNode;
  /**
   * Function component to render above the content.
   */
  header?: RenderProp<ViewProps>;
  /**
   * Function component to render below the content.
   */
  footer?: RenderProp<ViewProps>;
  /**
   * Function component to render above the card.
   * Accents may change its color depending on *status* property.
   */
  accent?: RenderProp<ViewProps>;
  /**
   * Appearance of the component.
   * Can be `filled` or `outline`.
   * Defaults to *outline*.
   */
  appearance?: LiteralUnion<'filled' | 'outline'>;
  /**
   * Status of the component.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *basic*.
   */
  status?: EvaStatus;
}

export type CardElement = React.ReactElement<CardProps>;

/**
 * Cards contain content and actions about a single subject.
 *
 * @extends React.FC
 *
 * @property {ReactNode} children - Component to render within the card.
 *
 * @property {ReactElement | (ViewProps) => ReactElement} header - Function component
 * to render above the content.
 *
 * @property {ReactElement | (ViewProps) => ReactElement} footer - Function component
 * to render below the content.
 *
 * @property {ReactElement | (ViewProps) => ReactElement} accent - Function component
 * to render above the card.
 * Accents may change it's color depending on *status* property.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `filled` or `outline`.
 * Defaults to *outline*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example CardSimpleUsage
 * In basic example, card accepts content view as child element.
 *
 * @overview-example CardAccessories
 * It also may have header and footer by configuring `header` and `footer` properties.
 *
 * @overview-example CardStatuses
 */
export const Card: React.FC<CardProps> = (props): TouchableWebElement => {
  const {
    appearance,
    status,
    style,
    children,
    accent,
    header,
    footer,
    onPressIn: onPressInProp,
    onPressOut: onPressOutProp,
    ...touchableProps
  } = props;

  const { style: evaStyle, dispatch } = useStyled('Card', {
    appearance,
    status,
  });

  // Split eva style into component parts
  const componentStyle = useMemo(() => {
    const {
      bodyPaddingVertical,
      bodyPaddingHorizontal,
      accentHeight,
      accentBackgroundColor,
      headerPaddingVertical,
      headerPaddingHorizontal,
      footerPaddingVertical,
      footerPaddingHorizontal,
      ...containerParameters
    } = evaStyle as StyleType;

    return {
      container: containerParameters,
      body: {
        paddingVertical: bodyPaddingVertical,
        paddingHorizontal: bodyPaddingHorizontal,
      },
      accent: {
        height: accentHeight,
        backgroundColor: accentBackgroundColor,
      },
      header: {
        paddingHorizontal: headerPaddingHorizontal,
        paddingVertical: headerPaddingVertical,
      },
      footer: {
        paddingHorizontal: footerPaddingHorizontal,
        paddingVertical: footerPaddingVertical,
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

  // Fallback accent view renderer
  const renderStatusAccent = (accentStyle: StyleType): React.ReactElement => {
    return (
      <View style={accentStyle} />
    );
  };

  return (
    <TouchableWeb
      {...touchableProps}
      style={[styles.container, componentStyle.container, style]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <FalsyFC
        style={componentStyle.accent}
        fallback={renderStatusAccent(componentStyle.accent)}
        component={accent}
      />
      <FalsyFC
        style={[styles.transparent, componentStyle.header]}
        component={header}
      />
      {header && <Divider />}
      <View style={[styles.content, componentStyle.body]}>
        {children}
      </View>
      {footer && <Divider />}
      <FalsyFC
        style={[styles.transparent, componentStyle.footer]}
        component={footer}
      />
    </TouchableWeb>
  );
};

Card.displayName = 'Card';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  content: {
    flexShrink: 1,
  },
});
