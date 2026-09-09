// Several rules land on the same lines: `ref-type-generic-drop` discards `Partial<ImageProps>`,
// `useref-null-arg` then supplies the initial value, and `import-hygiene` clears up both the
// stranded `ImageProps` import and the duplicate `@ui-kitten/components` declarations.
import React from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ThemeStyleType } from '@eva-design/dss';
import { SchemaProcessor } from '@eva-design/processor';
import { forwardRef } from 'react';
import {
  ApplicationProvider,
  Icon,
  Input,
} from '@ui-kitten/components';
import { Select, SelectProps } from '@ui-kitten/components';

export const iconRef = React.useRef<Icon<Partial<ImageProps>>>();
export const inputRef: React.RefObject<Input> = React.createRef();

export const Wrapped = forwardRef((props: SelectProps, ref: React.Ref<Select>) => (
  <Select
    {...props}
    ref={ref}
  />
));

export const processor = new SchemaProcessor();
export type Styles = ThemeStyleType;

export default (): React.ReactElement => (
  <ApplicationProvider
    {...eva}
    theme={eva.light}
  >
    <Icon
      ref={iconRef}
      name='star'
      style={styles.icon}
    />
  </ApplicationProvider>
);

const styles = StyleSheet.create({ icon: { width: 24 } });
