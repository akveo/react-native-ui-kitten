import React from 'react';
import { useRef } from 'react';
import { IconRef, InputRef } from '@ui-kitten/components';

// Typed but uninitialised: mechanical, the value has always been null.
export const a = React.useRef<IconRef>(null);
export const b = useRef<InputRef>(null);

// Already initialised: untouched.
export const c = React.useRef<IconRef>(null);

// Untyped and uninitialised: reported, not rewritten — `useRef(null)` infers `RefObject<null>`.
export const d = React.useRef();
