import React from 'react';
import {
  createStyle,
  getStyle,
  ThemeMappingType,
} from 'eva';
import { StyleContext } from './styleContext';
import {
  ThemeType,
  StyleType,
} from '../../component';
import { createThemedStyle } from '../../service/style';

export type CreateStyleFunction = (component: string,
                                   appearance: string,
                                   variants: string[],
                                   states: string[]) => StyleType;

export interface Props {
  mapping: ThemeMappingType;
  theme: ThemeType;
  children: JSX.Element | React.ReactNode;
}

interface State {
  createStyle: CreateStyleFunction;
}

export class StyleProvider extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      createStyle: this.createComponentStyle,
    };
  }

  private createComponentStyle = (component: string,
                                  appearance: string,
                                  variants: string[],
                                  states: string[]): StyleType => {

    let styleMapping = getStyle(component, appearance, variants, states);

    if (styleMapping) {
      return createThemedStyle(styleMapping, this.props.theme);
    } else {
      styleMapping = createStyle(this.props.mapping, component, appearance, variants, states);
      return createThemedStyle(styleMapping, this.props.theme);
    }
  };

  render() {
    return (
      <StyleContext.Provider
        value={this.state.createStyle}>
        {this.props.children}
      </StyleContext.Provider>
    );
  }
}
