/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
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
import { Divider } from '../divider/divider.component';

type CardStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'filled' | 'outline' | string;
}>;

export interface CardProps extends TouchableWebProps, CardStyledProps {
  children?: React.ReactNode;
  accent?: RenderProp<ViewProps>;
  header?: RenderProp<ViewProps>;
  footer?: RenderProp<ViewProps>;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control' | string;
}

export type CardElement = React.ReactElement<CardProps>;

/**
 * Styled `Card` component is a basic content container component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled` or `outline`.
 * Default is `outline`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {ReactNode} children - Determines text of the component.
 *
 * @property {() => ReactElement | ReactElement<CardHeaderProps>} header - Determines header of the component.
 *
 * @property {() => ReactElement} footer - Determines footer of the component.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example CardSimpleUsage
 *
 * @overview-example CardWithHeaderAndFooter
 *
 * @overview-example CardCustomHeader
 *
 * @overview-example CardStatuses
 */
class CardComponent extends React.Component<CardProps> {

  static styledComponentName: string = 'Card';

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
      bodyPaddingVertical,
      bodyPaddingHorizontal,
      accentHeight,
      accentBackgroundColor,
      headerPaddingVertical,
      headerPaddingHorizontal,
      footerPaddingVertical,
      footerPaddingHorizontal,
      ...containerParameters
    } = source;

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
  };

  private renderStatusAccent = (evaStyle): React.ReactElement => {
    return (
      <View style={evaStyle}/>
    );
  };

  public render(): TouchableWebElement {
    const { eva, style, children, accent, header, footer, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[evaStyle.container, styles.container, style]}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.accent}
          fallback={this.renderStatusAccent(evaStyle.accent)}
          component={accent}
        />
        <FalsyFC
          style={evaStyle.header}
          component={header}
        />
        {header && <Divider/>}
        <View style={[styles.body, evaStyle.body]}>
          {this.props.children}
        </View>
        {footer && <Divider/>}
        <FalsyFC
          style={evaStyle.footer}
          component={footer}
        />
      </TouchableWeb>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  body: {
    backgroundColor: 'transparent',
  },
});

export const Card = styled<CardProps>(CardComponent);
