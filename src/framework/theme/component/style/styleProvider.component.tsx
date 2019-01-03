import React from 'react';
import { StyleContext } from './styleContext';
import {
  StyleType,
  ThemeMappingType,
  ThemeType,
} from '../../component';
import { createStyle } from '../../service/style';
import { getComponentMapping } from '../../service/mapping';
import { StyleCacheService } from '../../service/style/cache.service';
import { default as rawCache } from '../cache-app-tmp.json';

type CreateStyleFunction = (component: string,
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

  private cacheService = new StyleCacheService(rawCache);

  constructor(props) {
    super(props);
    this.state = {
      createStyle: this.createComponentStyle,
    };
  }

  createComponentStyle = (component: string, appearance: string, variants: string[], states: string[]): StyleType => {
    const styleCache = this.cacheService.getStyle(component, appearance, variants, states);

    if (styleCache === undefined) {
      return createStyle(
        this.props.theme,
        getComponentMapping(this.props.mapping, component),
        appearance,
        variants,
        states,
      );
    }
    return styleCache;
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
