import React from 'react';
import { SchemaProcessor } from 'eva/packages/processor/kitten';
import {
  ThemeStyleType,
  SchemaType,
  CustomSchemaType,
} from 'eva/packages/types';
import merge from 'lodash.merge';
import { ModalPanel } from '../modal';
import { StyleProvider } from '../style';
import { ThemeProviderProps } from '../theme';
import { ThemeType } from '../../type';

interface ApplicationProviderProps {
  mapping: SchemaType;
  customMapping?: CustomSchemaType;
}

export type Props = ApplicationProviderProps & ThemeProviderProps;

interface State {
  styles: ThemeStyleType;
  theme: ThemeType;
}

export class ApplicationProvider extends React.Component<Props, State> {

  private schemaProcessor: SchemaProcessor = new SchemaProcessor();

  constructor(props: Props) {
    super(props);
    const { mapping, customMapping, theme } = this.props;

    const styles: ThemeStyleType = this.createStyles(mapping, customMapping);

    this.state = { styles, theme };
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
