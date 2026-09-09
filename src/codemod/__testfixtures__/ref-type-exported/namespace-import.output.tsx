// `UIKitten.Input` is a QualifiedName, not an Identifier — a regex over `\bInput\b` gets this
// wrong in both directions.
import React from 'react';
import * as UIKitten from '@ui-kitten/components';

export const ref = React.useRef<UIKitten.InputRef>(null);
export const selectRef = React.useRef<UIKitten.SelectRef>(null);
