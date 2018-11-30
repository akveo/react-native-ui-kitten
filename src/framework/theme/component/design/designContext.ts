import React from 'react';
import {
  Components,
  DesignType,
} from '@rk-kit/design';

const defaultValue: DesignType[] = Components;
const DesignContext = React.createContext(defaultValue);

export default DesignContext;
