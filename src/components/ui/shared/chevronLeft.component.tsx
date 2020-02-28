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

export type ChevronLeftProps = SvgProps;
export type ChevronLeftElement = React.ReactElement<ChevronLeftProps>;

export class ChevronLeft extends React.Component<SvgProps> {

  public render(): React.ReactElement<SvgProps> {
    return (
      <Svg {...this.props} viewBox='0 0 24 24'>
        <G data-name='Layer 2'>
          <G data-name='chevron-left'>
            <Rect
              width='24'
              height='24'
              transform='rotate(90 12 12)'
              opacity='0'
            />
            <Path
              d='M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z'/>
          </G>
        </G>
      </Svg>
    );
  }
}
