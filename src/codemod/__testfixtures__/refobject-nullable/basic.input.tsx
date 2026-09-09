// `createRef<T>()` returns `RefObject<T | null>`, so annotating it `RefObject<T>` is TS2322 under
// strictNullChecks — which every React Native tsconfig preset turns on.
import React from 'react';
import { InputRef, SelectRef } from '@ui-kitten/components';

export const a: React.RefObject<InputRef> = React.createRef();
export const b: React.RefObject<SelectRef | null> = React.createRef();

// Not a createRef result: left alone, because the nullability is the caller's business.
export const c: React.RefObject<InputRef> = someRefFromSomewhere();

declare function someRefFromSomewhere(): React.RefObject<InputRef>;
