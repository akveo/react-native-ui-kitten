/**
 * The cases the codemod deliberately does not rewrite.
 *
 * Unlike `App.tsx`, this file is *expected* to still fail `tsc` after the codemod runs — that is
 * the point. What the end-to-end check asserts here is that every one of these produced a report
 * entry telling the user exactly what to do, rather than being silently left behind.
 */

import React from 'react';
import { Button, MenuGroup, Modal, Tooltip } from '@ui-kitten/components';
import merge from 'lodash.merge';

// Group D: `Tooltip` and `Modal` are plain function components in v6 and accept no ref.
export const tooltipRef = React.useRef<Tooltip>(null);
export const modalRef = React.useRef<Modal>(null);

// No type argument and no initial value: `useRef(null)` would infer `RefObject<null>`, which no
// `ref` prop accepts, so the type has to come from a human.
export const untyped = React.useRef();

// `lodash.merge` came in transitively through v5's `@ui-kitten/components`. v6 dropped it.
export const combined = merge({}, { a: 1 }, { b: 2 });

// A UI Kitten name in a type position that is not a ref: in v5 this was the class's instance type.
export declare const group: MenuGroup;

export const Screen = (): React.ReactElement => (
  <>
    <Tooltip
      anchor={() => <Button>Anchor</Button>}
      visible={false}
      ref={tooltipRef}
    >
      Hint
    </Tooltip>
    <Modal
      visible={false}
      ref={modalRef}
    />
  </>
);
