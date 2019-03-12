import React from 'react';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';
import { MappingProviderProps } from '../mapping';
import { ThemeProviderProps } from '../theme';
import { ThemeType } from '../../type';
import { ModalPanel } from '../modal';
import { StyleProvider } from '../style';

interface ApplicationProviderProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

export type Props = MappingProviderProps & ThemeProviderProps & ApplicationProviderProps;

interface State {
  mapping: ThemeMappingType;
  styles: ThemeStyleType;
  theme: ThemeType;
}

export class ApplicationProvider extends React.Component<Props, State> {

  public state: State = {
    mapping: this.props.mapping,
    styles: this.props.styles,
    theme: this.props.theme,
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
