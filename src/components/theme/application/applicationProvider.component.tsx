/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import merge from 'lodash.merge';
import { SchemaProcessor } from '@eva-design/processor';
import {
  CustomSchemaType,
  SchemaType,
  ThemeStyleType,
} from '@eva-design/dss';
import { StyleProvider } from '../style/styleProvider.component';
import { ThemeProviderProps } from '../theme/themeProvider.component';
import { ModalPanel } from '../modal/modalPanel.component';

interface EvaRuntimeProcessingProps {
  mapping: SchemaType;
  customMapping?: CustomSchemaType;
}

interface EvaBuildtimeProcessingProps {
  styles: ThemeStyleType;
}

type EvaProcessingProps = EvaRuntimeProcessingProps | EvaBuildtimeProcessingProps;

export type ApplicationProviderProps = EvaProcessingProps & ThemeProviderProps;
export type ApplicationProviderElement = React.ReactElement<ApplicationProviderProps>;

interface State {
  styles: ThemeStyleType;
}

/**
 * `ApplicationProvider` component is designed to be a root of the application.
 *
 * This does basically two things:
 * - Provides styles for basic components;
 * - Renders modal window which is used to be common for all elements presented as modal;
 *
 * @extends React.Component
 *
 * @property {SchemaType} mapping - Determines the mapping for basic components.
 * This is designed to be provided from any `@eva-design/*` package (e.g. `@eva-design/eva`)
 * If provided, will be merged with customMapping to bootstrap eva during the runtime.
 *
 * @property {CustomSchemaType} customMapping - Determines the customized mapping.
 * This is merged with `mapping` property and designed to be used components customization.
 *
 * @property {ThemeType} theme - Determines the theme for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva-design/eva`).
 *
 * @property {ThemeStyleType} styles - Determines the styles compiled by bootstrapping eva.
 * If provided, will replace runtime styles calculation.
 * Should be used with `@ui-kitten/metro-config` package.
 *
 * @property {ReactNode} children - Determines application root component.
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
 * import * as eva from '@eva-design/eva';
 *
 * export default () => (
 *   <ApplicationProvider {...eva} theme={eva.light}>
 *     <Layout style={{ flex: 1 }}>
 *       <Text>Welcome to UI Kitten</Text>
 *     </Layout>
 *   </ApplicationProvider>
 * );
 * ```
 */
export class ApplicationProvider extends React.Component<ApplicationProviderProps, State> {

  public state: State = {
    styles: (this.props as EvaBuildtimeProcessingProps).styles,
  };

  private schemaProcessor: SchemaProcessor = new SchemaProcessor();

  constructor(props: ApplicationProviderProps) {
    super(props);

    if (!this.state.styles) {
      const { mapping, customMapping } = this.props as EvaRuntimeProcessingProps;
      this.state.styles = this.createStyles(mapping, customMapping);
    }
  }

  private createStyles = (mapping: SchemaType, custom: CustomSchemaType): ThemeStyleType => {
    const customizedMapping: SchemaType = merge({}, mapping, custom);
    return this.schemaProcessor.process(customizedMapping);
  };

  public render(): React.ReactNode {
    return (
      <StyleProvider
        theme={this.props.theme}
        styles={this.state.styles}>
        <ModalPanel>
          {this.props.children}
        </ModalPanel>
      </StyleProvider>
    );
  }
}
