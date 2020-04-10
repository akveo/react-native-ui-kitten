/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';

export interface Icons<T> {
  [key: string]: IconProvider<T>;
}

export interface IconPack<T> {
  name: string;
  icons: Icons<T>;
}

export interface IconProvider<T> {
  toReactElement(props?: T): React.ReactElement<T>;
}
