/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import merge from 'lodash.merge';
import { SchemaProcessor } from '@eva/processor-kitten';
import {
  ThemeStyleType,
  SchemaType,
  CustomSchemaType,
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
