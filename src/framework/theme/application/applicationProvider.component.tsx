/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import merge from 'lodash.merge';
import { SchemaProcessor } from '@eva/processor-kitten';
import {
  CustomSchemaType,
  SchemaType,
  ThemeStyleType,
} from '@eva/core';
import { StyleProvider } from '../style/styleProvider.component';
import { ThemeProviderProps } from '../theme/themeProvider.component';
import { ModalPanel } from '../modal/modalPanel.component';
import { ThemeType } from '../theme/type';

interface ComponentProps {
  mapping: SchemaType;
  customMapping?: CustomSchemaType;
}

export type ApplicationProviderProps = ComponentProps & ThemeProviderProps;

interface State {
  styles: ThemeStyleType;
  theme: ThemeType;
}

/**
 * The `ApplicationProvider` component is designed to be a root of the application.
 *
 * This does basically two things:
 * - Provides styles for react-native-ui-kitten basic components (e.g 'Button');
 * - Renders modal window which is used to be common for all elements presented as modal;
 *
 * @extends React.Component
 *
 * @property {SchemaType} mapping - Determines the mapping for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva/eva`).
 *
 * @property {CustomSchemaType} customMapping - Determines the customization mapping.
 * This is merged with `mapping` property and designed to be used components customization.
 * Optional.
 *
 * @property {ThemeType} theme - Determines the theme for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva/theme-eva`).
 *
 * @property {React.ReactNode} children - Determines application root component.
 *
 * @property ThemeProviderProps
 *
 * @example ApplicationProvider API example
 *
 * ```
 * import { mapping } from '@eva/eva';
 * import { theme } from '@eva/theme-eva';
 * import { ApplicationProvider } from '@kitten/theme';
 * import { Application } from './path-to/root.component';
 *
 * export default class App extends React.Component {
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <ApplicationProvider
 *         mapping={mapping}
 *         theme={theme}>
 *         <Application/>
 *       </ApplicationProvider>
 *     );
 *   }
 * }
 * ```
 */

export class ApplicationProvider extends React.Component<ApplicationProviderProps, State> {

  private schemaProcessor: SchemaProcessor = new SchemaProcessor();

  constructor(props: ApplicationProviderProps) {
    super(props);
    const { mapping, customMapping, theme } = this.props;

    const styles: ThemeStyleType = this.createStyles(mapping, customMapping);

    this.state = {
      styles,
      theme,
    };
  }

  private createStyles = (mapping: SchemaType, custom: CustomSchemaType): ThemeStyleType => {
    const customizedMapping: SchemaType = merge({}, mapping, custom);

    return this.schemaProcessor.process(customizedMapping);
  };

  public render(): React.ReactNode {
    return (
      <StyleProvider {...this.state}>
        <ModalPanel>
          {this.props.children}
        </ModalPanel>
      </StyleProvider>
    );
  }
}
