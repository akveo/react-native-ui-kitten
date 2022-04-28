/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';

/**
 * Singleton service designed to store status bar offset configuration.
 *
 * @type ModalService
 *
 * @property {boolean} getShouldUseTopInsets - returns `true` if StatusBar additional offset is not enabled,
 * returns `false` if StatusBar additional offset is enabled.
 *
 * @property {boolean} setShouldUseTopInsets - `true` value enables StatusBar additional offset,
 * `false` disables StatusBar additional offset
 *
 * @overview-example StatusBar additional offset support configuration
 * ModalService could also control additional status bar offset configuration
 * for all related UI Kitten measurable elements like [Modal](components/modal) and [Popover](components/popover).
 *
 * ```
 * import React from 'react';
 * import * as eva from '@eva-design/eva';
 * import { ApplicationProvider, Layout, Text, ModalService } from '@ui-kitten/components';
 *
 * ModalService.setShouldUseTopInsets = true //applies StatusBar additional offset
 *
 * const HomeScreen = () => (
 *   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 *     <Text category='h1'>HOME</Text>
 *   </Layout>
 * );
 *
 * export default () => {
 *
 *   return (
 *     <ApplicationProvider {...eva} theme={eva.light}>
 *       <HomeScreen />
 *     </ApplicationProvider>
 *   )
 * };
 * ```
 */
class ModalServiceType {

  private shouldUseTopInsets: boolean = false;

  public set setShouldUseTopInsets(state: boolean) {
    this.shouldUseTopInsets = state;
  }

  public get getShouldUseTopInsets(): boolean {
    return this.shouldUseTopInsets;
  }
}

export const ModalService = new ModalServiceType();
