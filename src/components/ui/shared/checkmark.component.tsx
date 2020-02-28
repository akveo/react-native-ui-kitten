/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  G,
  Path,
  Rect,
  Svg,
  SvgProps,
} from 'react-native-svg';

export type CheckMarkProps = SvgProps;
export type CheckMarkElement = React.ReactElement<CheckMarkProps>;

export class CheckMark extends React.Component<SvgProps> {

  public render(): React.ReactElement<SvgProps> {
    return (
      <Svg {...this.props} viewBox='0 0 24 24'>
        <G data-name='Layer 2'>
          <G data-name='checkmark'>
            <Rect width='24' height='24' opacity='0'/>
            <Path
              d='M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z'/>
          </G>
        </G>
      </Svg>
    );
  }
}
