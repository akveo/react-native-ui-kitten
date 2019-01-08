import React from 'react';
import { CreateStyleFunction } from './styleProvider.component';

const defaultValue: CreateStyleFunction = () => {};

export const StyleContext = React.createContext(defaultValue);
