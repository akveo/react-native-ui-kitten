// Running the codemod twice must be a no-op. This is v6 code already.
import React from 'react';
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, IconRef, InputRef, Layout, Button } from '@ui-kitten/components';
import type { ThemeStyleType } from '@ui-kitten/processor';

export const iconRef = React.useRef<IconRef>(null);
export const inputRef = React.useRef<InputRef>(null);
export const buttonRef = React.useRef<React.ComponentRef<typeof Button>>(null);
export const nullable: React.RefObject<InputRef | null> = React.createRef();

export type Styles = ThemeStyleType;

export default (): React.ReactElement => (
  <ApplicationProvider
    {...eva}
    theme={eva.light}
  >
    <Layout />
  </ApplicationProvider>
);
