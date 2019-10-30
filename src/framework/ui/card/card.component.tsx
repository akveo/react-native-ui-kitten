/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Divider,
  DividerElement,
} from '../divider/divider.component';
import { CardHeaderComponentElement } from './cardHeader.component';
import { allWithPrefix } from '../support/services';

interface HeaderStyles {
  style: StyleProp<ViewStyle>;
  accent: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  description: StyleProp<TextStyle>;
}

export type CardHeaderElement = React.ReactElement<any> | CardHeaderComponentElement;
export type CardFooterElement = React.ReactElement<any>;

interface ComponentProps {
  appearance?: string;
  status?: string;
  children: React.ReactNode;
  header?: () => CardHeaderElement;
  footer?: () => CardFooterElement;
}

export type CardProps = StyledComponentProps & ViewProps & ComponentProps;
export type CardElement = React.ReactElement<CardProps>;

/**
 * Styled `Card` component is a basic content container component.
 *
 * @extends React.Component
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger`.
 * Default is `basic`.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled` or `outline`.
 * Default is `outline`.
 *
 * @property {React.ReactNode} children - Determines text of the component.
 *
 * @property {() => CardHeaderElement} header - Determines header of the component.
 *
 * @property {() => CardFooterElement} footer - Determines footer of the component.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @overview-example CardSimpleUsage
 *
 * @overview-example CardStatuses
 *
 * @overview-example CardEvaHeader
 *
 * @overview-example CardCustomHeader
 *
 * @overview-example CardFooter
 *
 * @overview-example CardHeaderFooter
 */

class CardComponent extends React.Component<CardProps> {

  static styledComponentName: string = 'Card';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      backgroundColor,
      borderRadius,
      borderWidth,
      borderColor,
    } = source;

    const headerStyles: StyleType = allWithPrefix(source, 'header');
    const bodyStyles: StyleType = allWithPrefix(source, 'body');
    const footerStyles: StyleType = allWithPrefix(source, 'footer');
    const accentStyles: StyleType = allWithPrefix(source, 'accent');
    const titleStyles: StyleType = allWithPrefix(source, 'title');
    const descriptionStyles: StyleType = allWithPrefix(source, 'description');

    return {
      container: {
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        borderColor: borderColor,
      },
      header: {
        paddingVertical: headerStyles.headerPaddingVertical,
        paddingHorizontal: headerStyles.headerPaddingHorizontal,
      },
      body: {
        paddingVertical: bodyStyles.bodyPaddingVertical,
        paddingHorizontal: bodyStyles.bodyPaddingHorizontal,
      },
      footer: {
        paddingVertical: footerStyles.footerPaddingVertical,
        paddingHorizontal: footerStyles.footerPaddingHorizontal,
      },
      title: {
        fontFamily: titleStyles.titleFontFamily,
        fontSize: titleStyles.titleFontSize,
        fontWeight: titleStyles.titleFontWeight,
        lineHeight: titleStyles.titleLineHeight,
        color: titleStyles.titleColor,
      },
      description: {
        fontFamily: descriptionStyles.titleFontFamily,
        fontSize: descriptionStyles.titleFontSize,
        fontWeight: descriptionStyles.titleFontWeight,
        lineHeight: descriptionStyles.titleLineHeight,
        color: descriptionStyles.descriptionColor,
      },
      accent: {
        backgroundColor: accentStyles.accentBackgroundColor,
        height: accentStyles.accentHeight,
      },
    };
  };

  private renderDivider = (): DividerElement => {
    return (
      <Divider/>
    );
  };

  private renderHeader = (headerStyles: HeaderStyles): CardHeaderElement => {
    const header: CardHeaderElement = this.props.header();

    return React.cloneElement(header, {
      headerStyle: [styles.header, headerStyles.style, header.props.style],
      accentStyle: headerStyles.accent,
      titleStyle: headerStyles.title,
      descriptionStyle: headerStyles.description,
    });
  };

  private renderFooter = (style: StyleType): CardFooterElement => {
    const footer: CardFooterElement = this.props.footer();

    return React.cloneElement(footer, {
      style: [styles.footer, footer.props.style, style],
    });
  };

  private renderBody = (style: StyleType): React.ReactNode => {
    return (
      <View style={[styles.body, style]}>
        {this.props.children}
      </View>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { header, footer } = this.props;
    const headerStyles: HeaderStyles = {
      style: style.header,
      accent: style.accent,
      title: style.title,
      description: style.description,
    };

    return [
      header && this.renderHeader(headerStyles),
      this.renderBody(style.body),
      footer && this.renderFooter(style.footer),
    ];
  };

  public render(): CardElement {
    const { themedStyle, style, children, ...restProps } = this.props;
    const { container, ...childrenStyles } = this.getComponentStyle(themedStyle);
    const [header, body, footer] = this.renderComponentChildren(childrenStyles);

    return (
      <View
        {...restProps}
        style={[container, styles.container, style]}>
        {header}
        {header && this.renderDivider()}
        {body}
        {footer && this.renderDivider()}
        {footer}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: 'transparent',
  },
  footer: {
    backgroundColor: 'transparent',
  },
});

export const Card = styled<CardProps>(CardComponent);
