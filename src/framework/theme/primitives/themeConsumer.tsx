import React from 'react';
import {Consumer} from './createContext';

function withTheme(Component) {
  return (
    <Consumer>
      {theme => {
        return React.cloneElement(Component, {theme});
      }}
    </Consumer>
  )
}

export default withTheme;