/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import merge from 'lodash.merge';
import { SchemaProcessor } from '@eva-design/processor';
import { CustomSchemaType, SchemaType, ThemeStyleType } from '@eva-design/dss';
import { StyleProvider } from '../style/styleProvider.component';
import { ThemeProviderProps } from '../theme/themeProvider.component';
import { ModalPanel } from '../modal/modalPanel.component';

interface ComponentProps {
  mapping: SchemaType;
  customMapping?: CustomSchemaType;
  styles?: ThemeStyleType;
}

export type ApplicationProviderProps = ComponentProps & ThemeProviderProps;
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
 *
 * @property {CustomSchemaType} customMapping - Determines the customized mapping.
 * This is merged with `mapping` property and designed to be used components customization.
 *
 * @property {ThemeType} theme - Determines the theme for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva-design/eva`).
 *
 * @property {ThemeStyleType} styles - Determines the compiled styles.
 * If ApplicationProvider receives this property, it will replace runtime mapping processing.
 *
 * @property {ReactNode} children - Determines application root component.
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
 * import { mapping, light as lightTheme } from '@eva-design/eva';
 *
 * export default class App extends React.Component {
 *
 *   render() {
 *     return (
 *       <ApplicationProvider
 *         mapping={mapping}
 *         theme={lightTheme}>
 *         <Layout style={{ flex: 1 }}>
 *           <Text>Welcome to UI Kitten</Text>
 *         </Layout>
 *       </ApplicationProvider>
 *     );
 *   }
 * }
 * ```
 */
export class ApplicationProvider extends React.Component<ApplicationProviderProps, State> {

  public state: State = {
    styles: this.props.styles,
  };

  private schemaProcessor: SchemaProcessor = new SchemaProcessor();

  constructor(props: ApplicationProviderProps) {
    super(props);

    if (!this.state.styles) {
      this.state.styles = this.createStyles(props.mapping, props.customMapping);
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
