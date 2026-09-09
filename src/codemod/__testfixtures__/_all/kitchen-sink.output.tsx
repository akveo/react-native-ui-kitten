// Several rules land on the same lines: `ref-type-generic-drop` discards `Partial<ImageProps>`,
// `useref-null-arg` then supplies the initial value, and `import-hygiene` clears up both the
// stranded `ImageProps` import and the duplicate `@ui-kitten/components` declarations.
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@ui-kitten/eva';
import type { ThemeStyleType } from '@ui-kitten/processor';
import { SchemaProcessor } from '@ui-kitten/processor';
import {
  ApplicationProvider,
  Icon,
  InputRef,
  SelectRef,
  IconRef,
  Select,
  SelectProps,
} from '@ui-kitten/components';

export const iconRef = React.useRef<IconRef>(null);
export const inputRef: React.RefObject<InputRef | null> = React.createRef();

export const Wrapped = forwardRef((props: SelectProps, ref: React.Ref<SelectRef>) => (
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
