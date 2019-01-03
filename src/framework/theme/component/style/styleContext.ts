import React from 'react';
import { CreateStyleFunction } from './type';

const defaultValue: CreateStyleFunction = () => {};

export const StyleContext = React.createContext(defaultValue);
