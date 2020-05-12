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

export type ChevronRightProps = SvgProps;
export type ChevronRightElement = React.ReactElement<ChevronRightProps>;

export class ChevronRight extends React.Component<SvgProps> {

  public render(): React.ReactElement<SvgProps> {
    return (
      <Svg {...this.props} viewBox='0 0 24 24'>
        <G data-name='Layer 2'>
          <G data-name='chevron-right'>
            <Rect
              width='24'
              height='24'
              transform='rotate(-90 12 12)'
              opacity='0'
            />
            <Path
              d='M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z'/>
          </G>
        </G>
      </Svg>
    );
  }
}
