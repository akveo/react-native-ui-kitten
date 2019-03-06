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

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      mapping: props.mapping,
      styles: props.styles,
      theme: props.theme,
    };
  }

  render() {
   return (
     <ModalPanel>
       <StyleProvider
         mapping={this.state.mapping}
         styles={this.state.styles}
         theme={this.state.theme}
         children={this.props.children}
       />
     </ModalPanel>
   );
  }
}
