/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { IconRegistryService } from './service/iconRegistry.service';
import { IconPack } from './service/type';

type IconsProp = IconPack<any> | IconPack<any>[];

export interface IconRegistryProps {
  icons: IconsProp;
  defaultIcons?: string;
}

export type IconRegistryElement = React.ReactElement<IconRegistryProps>;

/**
 * Registers one or more icon packs for later usage in Icon component.
 * Renders nothing, but should be added as a child of an Application Root.
 *
 * @extends React.Component
 *
 * @property {IconPack<any> | IconPack<any>[]} icons - Icon packs to register.
 * @property {string} defaultIcons - A name of an icon pack that is used by default.
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import * as eva from '@eva-design/eva';
 * import { ApplicationProvider, IconRegistry, Layout, Text, Icon, Button } from '@ui-kitten/components';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons'; // <-- Make sure it is installed. npm i @ui-kitten/eva-icons
 *
 * const LikeIcon = (props) => (
 *   <Icon {...props} name='like' />
 * );
 *
 * export default () => (
 *   <>
 *     <IconRegistry icons={EvaIconsPack}/>
 *     <ApplicationProvider {...eva} theme={eva.light}>
 *       <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 *         <Text>Welcome to UI Kitten</Text>
 *         <Button accessoryLeft={LikeIcon}>LIKE</Text>
 *       </Layout>
 *     </ApplicationProvider>
 *   </>
 * );
 * ```
 */
export class IconRegistry extends React.Component<IconRegistryProps> {

  static defaultProps: Partial<IconRegistryProps> = {
    icons: [],
  };

  private findDefaultIconPack = (packs: IconPack<any>[], name: string): IconPack<any> => {
    const requestedPackIndex: number = packs.findIndex((pack: IconPack<any>): boolean => {
      return pack.name === name;
    });

    return packs[Math.max(0, requestedPackIndex)];
  };

  private registerIcons = (source: IconsProp, defaultPack: string): void => {
    const packs: IconPack<any>[] = Array.isArray(source) ? source : [source];
    const defaultIconPack: IconPack<any> = this.findDefaultIconPack(packs, defaultPack);

    IconRegistryService.register(...packs);
    IconRegistryService.setDefaultIconPack(defaultIconPack.name);
  };

  public render(): React.ReactNode {
    const { icons, defaultIcons } = this.props;
    this.registerIcons(icons, defaultIcons);

    return null;
  }
}
