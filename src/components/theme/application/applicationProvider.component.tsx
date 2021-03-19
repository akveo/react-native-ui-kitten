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
 * Overall application container.
 *
 * @extends React.Component
 *
 * @property {ReactNode} children - Overall application component.
 * Usually, a router or nested providers.
 *
 * @property {SchemaType} mapping - Mapping for UI Kitten components.
 * This is designed to be provided from any `@eva-design/*` package.
 * If provided, will be merged with *customMapping* and compiled into styles during the runtime.
 * Can be improved with build-time processing with `@ui-kitten/metro-config` package.
 *
 * @property {CustomSchemaType} customMapping - Customized mapping.
 *
 * @property {ThemeType} theme - Current theme.
 * Designed to be provided from any `@eva-design/*` package.
 *
 * @property {ThemeStyleType} styles - Styles compiled by bootstrapping Eva packages.
 * If provided, will replace runtime styles processing.
 * Usually, can be provided by `@ui-kitten/metro-config` package.
 *
 * @overview-example Simple Usage
 * ApplicationProvider is designed to be the root component of the application.
 * It should be rendered **once**, to provide Eva styles for nested components.
 * ```
 * import React from 'react';
 * import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
 * import * as eva from '@eva-design/eva';
 *
 * export default () => (
 *   <ApplicationProvider {...eva} theme={eva.light}> // <-- {eva.dark} for dark mode
 *     <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Welcome to UI Kitten</Text>
 *     </Layout>
 *   </ApplicationProvider>
 * );
 * ```
 *
 * @overview-example Ecosystem
 * Also, it may accept [custom themes](guides/branding) and [icon packages](guides/icon-packages)
 * to provide a highly customizable, design system based application.
 * ```
 * import React from 'react';
 * import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons';
 * import * as eva from '@eva-design/eva';
 *
 * export default () => (
 *   <React.Fragment>
 *     <IconRegistry icons={EvaIconsPack} />
 *     <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
 *       <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *         <Text>Welcome to UI Kitten</Text>
 *       </Layout>
 *     </ApplicationProvider>
 *   </React.Fragment>
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