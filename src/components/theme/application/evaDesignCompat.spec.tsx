/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import * as eva from '@ui-kitten/eva';
import { SchemaProcessor, SchemaType } from '@ui-kitten/processor';
import { ApplicationProvider } from './applicationProvider.component';
import { Button } from '../../ui/button/button.component';
import { Text } from '../../ui/text/text.component';

/**
 * v5 apps import their mapping from `@eva-design/eva`. v6 ships `@ui-kitten/eva` instead, and the
 * migration guide recommends switching. This suite pins down *why* that switch is a recommendation
 * rather than a required break: the two mappings are the same document apart from the `$schema`
 * pointer, and the `$schema` key is inert at runtime.
 *
 * `@eva-design/eva` is deliberately NOT a dependency of this repo. Instead we reconstruct the exact
 * shape it ships — `@ui-kitten/eva`'s mapping with the `$schema` pointer it had before the move —
 * which a byte-level diff of the two published tarballs confirms is the only difference:
 *
 *   @eva-design/eva@2.2.0   "$schema": "./node_modules/@eva-design/dss/schema/schema.json"
 *   @ui-kitten/eva@6.0.0-beta.1  "$schema": "./node_modules/@ui-kitten/processor/schema/schema.json"
 *
 * If a future mapping change makes the two genuinely diverge, that is a real breaking change for
 * v5 apps and the migration guide must say so.
 */
describe('@eva-design/eva compatibility', () => {

  const EVA_DESIGN_SCHEMA_POINTER = './node_modules/@eva-design/dss/schema/schema.json';

  const asEvaDesignMapping = (): SchemaType => {
    return { ...eva.mapping, $schema: EVA_DESIGN_SCHEMA_POINTER } as SchemaType;
  };

  it('should compile identical styles regardless of the `$schema` pointer', () => {
    const processor = new SchemaProcessor();

    const fromUiKitten = processor.process(eva.mapping as SchemaType);
    const fromEvaDesign = processor.process(asEvaDesignMapping());

    expect(fromEvaDesign).toEqual(fromUiKitten);
  });

  it('should render identical styles when the mapping carries the `@eva-design/dss` pointer', () => {
    const renderButton = (mapping: SchemaType): Record<string, unknown> => {
      const api = render(
        <ApplicationProvider
          mapping={mapping}
          theme={eva.light}
        >
          <Button testID='@button'>
            <Text>Migrate me</Text>
          </Button>
        </ApplicationProvider>,
      );

      const style = api.getByTestId('@button').props.style;
      api.unmount();

      return style;
    };

    expect(renderButton(asEvaDesignMapping())).toEqual(renderButton(eva.mapping as SchemaType));
  });

  it('should expose the same module shape as `@eva-design/eva`', () => {
    // `@eva-design/eva`'s index is `{ mapping, light, dark }`; a v5 app spreads it into
    // ApplicationProvider as `{...eva} theme={eva.light}`, so the key set is load-bearing.
    expect(Object.keys(eva).sort()).toEqual(['dark', 'light', 'mapping']);
  });
});
