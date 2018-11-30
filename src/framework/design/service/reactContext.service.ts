import React from 'react';
import { Components } from '../config';
import { DesignType } from '../component';

const defaultDesignValue: DesignType[] = Components;

const {
  Provider,
  Consumer,
} = React.createContext(defaultDesignValue);

export {
  Provider,
  Consumer,
};
