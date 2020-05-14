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

export type MinusProps = SvgProps;
export type MinusElement = React.ReactElement<MinusProps>;

export class Minus extends React.Component<SvgProps> {

  public render(): React.ReactElement<SvgProps> {
    return (
      <Svg {...this.props} viewBox='0 0 24 24'>
        <G data-name='Layer 2'>
          <G data-name='minus'>
            <Rect
              width='24'
              height='24'
              transform='rotate(180 12 12)'
              opacity='0'
            />
            <Path d='M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z'/>
          </G>
        </G>
      </Svg>
    );
  }
}
