/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ThemeType } from './type';

const defaultValue: ThemeType = {};

export const ThemeContext: React.Context<ThemeType> = React.createContext(defaultValue);
