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

export type ChevronDownProps = SvgProps;
export type ChevronDownElement = React.ReactElement<ChevronDownProps>;

export class ChevronDown extends React.Component<SvgProps> {

  public render(): React.ReactElement<SvgProps> {
    return (
      <Svg {...this.props} viewBox='0 0 24 24'>
        <G data-name='Layer 2'>
          <G data-name='chevron-down'>
            <Rect width='24' height='24' opacity='0'/>
            <Path
              d='M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z'/>
          </G>
        </G>
      </Svg>
    );
  }
}
