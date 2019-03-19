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

export type Props = ApplicationProviderProps & MappingProviderProps & ThemeProviderProps;

interface State {
  style: ThemeStyleType;
  theme: ThemeType;
  mapping: ThemeMappingType;
}

export class ApplicationProvider extends React.Component<Props, State> {

  public state: State = {
    style: this.props.style,
    theme: this.props.theme,
    mapping: this.props.mapping,
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
