/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { render } from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { CustomSchemaType } from '@ui-kitten/processor';
import { ApplicationProvider } from './applicationProvider.component';
import { createOnDemandStyles } from '../style/onDemandStyles';
import { Text } from '../../ui/text/text.component';

const fontSizeOf = (api: ReturnType<typeof render>, testID: string): number => {
  return (StyleSheet.flatten(api.getByTestId(testID).props.style) as { fontSize: number }).fontSize;
};

const textMapping = (fontSize: number): CustomSchemaType => ({
  components: {
    Text: {
      appearances: {
        default: {
          mapping: {},
          variantGroups: { category: { p1: { fontSize } } },
        },
      },
    },
  },
} as unknown as CustomSchemaType);

describe('@application-provider: custom mapping checks', () => {

  it('should apply a custom mapping after another provider styled the same component', () => {
    const plain = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Text testID='text'>Text</Text>
      </ApplicationProvider>,
    );
    expect(fontSizeOf(plain, 'text')).toEqual(15);

    const custom = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
        customMapping={textMapping(19)}
      >
        <Text testID='text'>Text</Text>
      </ApplicationProvider>,
    );
    expect(fontSizeOf(custom, 'text')).toEqual(19);

    const plainAgain = render(
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Text testID='text'>Text</Text>
      </ApplicationProvider>,
    );
    expect(fontSizeOf(plainAgain, 'text')).toEqual(15);
  });

  it('should keep the styles of two providers with different custom mappings apart', () => {
    const api = render(
      <View>
        <ApplicationProvider
          mapping={mapping}
          theme={light}
          customMapping={textMapping(23)}
        >
          <Text testID='custom'>Text</Text>
        </ApplicationProvider>
        <ApplicationProvider
          mapping={mapping}
          theme={light}
        >
          <Text testID='plain'>Text</Text>
        </ApplicationProvider>
      </View>,
    );

    expect(fontSizeOf(api, 'custom')).toEqual(23);
    expect(fontSizeOf(api, 'plain')).toEqual(15);
  });

  it('should restyle when the custom mapping changes at runtime', () => {
    const Scaled = ({ size }: { size: number }): React.ReactElement => (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
        customMapping={textMapping(size)}
      >
        <Text testID='text'>Text</Text>
      </ApplicationProvider>
    );
    const api = render(<Scaled size={17} />);
    expect(fontSizeOf(api, 'text')).toEqual(17);

    api.rerender(<Scaled size={21} />);
    expect(fontSizeOf(api, 'text')).toEqual(21);
  });

  it('should warn once when customMapping is passed next to compiled styles', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const styles = createOnDemandStyles(mapping);

    // The union type does not admit both props; the runtime tolerates it, which is what the warning is for.
    const props = { styles, theme: light, customMapping: textMapping(29) } as unknown as React.ComponentProps<typeof ApplicationProvider>;
    const api = render(
      <ApplicationProvider {...props}>
        <Text testID='text'>Text</Text>
      </ApplicationProvider>,
    );

    expect(fontSizeOf(api, 'text')).toEqual(15);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('`customMapping` is ignored');
    warn.mockRestore();
  });

});
