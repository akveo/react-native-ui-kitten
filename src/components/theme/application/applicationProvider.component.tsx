/**
  * @license
  * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
  * Licensed under the MIT License. See License.txt in the project root for license information.
  */

import React from 'react';
import { deepMerge } from '@ui-kitten/mapping-base';
import {
  CustomSchemaType,
  SchemaType,
  ThemeStyleType,
} from '@ui-kitten/processor';
import { StyleProvider } from '../style/styleProvider.component';
import { ModalPanel } from '../modal/modalPanel.component';
import { ThemeProviderProps } from '../theme/themeProvider.component';
import { styleCache } from '../style/styleCache';
import { createOnDemandStyles } from '../style/onDemandStyles';

interface EvaRuntimeProcessingProps {
  mapping: SchemaType;
  customMapping?: CustomSchemaType;
}

interface EvaBuildtimeProcessingProps {
  styles: ThemeStyleType;
}

type EvaProcessingProps = EvaRuntimeProcessingProps | EvaBuildtimeProcessingProps;

export type ApplicationProviderProps = EvaProcessingProps & ThemeProviderProps;
export type ApplicationProviderElement = React.ReactElement<ApplicationProviderProps>;

function createStyles(mapping: SchemaType, custom?: CustomSchemaType): ThemeStyleType {
  const customizedMapping: SchemaType = deepMerge(mapping, custom);
  // Styles are resolved per appearance/variant/state combination on first use instead of
  // expanding every combination up front (thousands of entries, seconds on low-end Hermes).
  return createOnDemandStyles(customizedMapping);
}

/**
 * Overall application container.
 *
 * @property {ReactNode} children - Overall application component.
 * Usually, a router or nested providers.
 *
 * @property {SchemaType} mapping - Mapping for UI Kitten components.
 * This is designed to be provided from any `@ui-kitten/*` package.
 * If provided, will be merged with *customMapping*; each component style is compiled
 * on first use during the runtime. Passing `styles` from `@ui-kitten/metro-config` instead
 * skips runtime compilation entirely.
 *
 * @property {CustomSchemaType} customMapping - Customized mapping.
 *
 * @property {ThemeType} theme - Current theme.
 * Designed to be provided from any `@ui-kitten/*` package.
 *
 * @property {ThemeStyleType} styles - Styles compiled by bootstrapping Eva packages.
 * If provided, will replace runtime styles processing.
 * Usually, can be provided by `@ui-kitten/metro-config` package.
 *
 * @overview-example Simple Usage
 * ApplicationProvider is designed to be the root component of the application.
 * It should be rendered **once**, to provide Eva styles for nested components.
 * ```
 * import React from 'react';
 * import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
 * import * as eva from '@ui-kitten/eva';
 *
 * export default () => (
 *   <ApplicationProvider {...eva} theme={eva.light}> // <-- {eva.dark} for dark mode
 *     <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *       <Text>Welcome to UI Kitten</Text>
 *     </Layout>
 *   </ApplicationProvider>
 * );
 * ```
 *
 * @overview-example Ecosystem
 * Also, it may accept [custom themes](guides/branding) and [icon packages](guides/icon-packages)
 * to provide a highly customizable, design system based application.
 * ```
 * import React from 'react';
 * import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons';
 * import * as eva from '@ui-kitten/eva';
 *
 * export default () => (
 *   <React.Fragment>
 *     <IconRegistry icons={EvaIconsPack} />
 *     <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
 *       <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *         <Text>Welcome to UI Kitten</Text>
 *       </Layout>
 *     </ApplicationProvider>
 *   </React.Fragment>
 * );
 * ```
 */
let didWarnIgnoredCustomMapping = false;

export function ApplicationProvider(props: ApplicationProviderProps): React.ReactElement {
  const buildtimeStyles = (props as EvaBuildtimeProcessingProps).styles;
  const { mapping, customMapping } = props as EvaRuntimeProcessingProps;

  if (buildtimeStyles && customMapping && !didWarnIgnoredCustomMapping && process.env.NODE_ENV !== 'production') {
    didWarnIgnoredCustomMapping = true;
    console.warn(
      'ApplicationProvider received both `styles` (compiled by @ui-kitten/metro-config) and ' +
      '`customMapping`; `customMapping` is ignored when `styles` is present. Pass `mapping` instead ' +
      'of `styles` to merge a mapping at runtime, or move the customization into the file Metro compiles.',
    );
  }

  // Clear style cache when mapping or theme changes so components recompute
  const prevMappingRef = React.useRef(mapping);
  const prevThemeRef = React.useRef(props.theme);
  if (prevMappingRef.current !== mapping || prevThemeRef.current !== props.theme) {
    styleCache.clear();
    prevMappingRef.current = mapping;
    prevThemeRef.current = props.theme;
  }

  const styles = React.useMemo<ThemeStyleType>(() => {
    if (buildtimeStyles) {
      return buildtimeStyles;
    }
    return createStyles(mapping, customMapping);
  }, [buildtimeStyles, mapping, customMapping]);

  return (
    <StyleProvider
      theme={props.theme}
      styles={styles}
    >
      <ModalPanel>
        {props.children}
      </ModalPanel>
    </StyleProvider>
  );
}
