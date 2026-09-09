// Three distinct situations, all reported and none rewritten.
import React from 'react';
import { Modal, Tooltip, OverflowMenu, Input, Button } from '@ui-kitten/components';

// 1. A ref type on a component that is a plain function component in v6.
export const modalRef = React.useRef<Modal>(null);

// 2. A component name used as a type somewhere that is not a ref. In v5 this was the class's
//    instance type; v6 has no equivalent, and guessing one would be inventing meaning.
export declare const field: Input;

export const Screen = (): React.ReactElement => (
  <>
    {/* 3. A `ref` prop on a component that no longer accepts one. Removing it could change
        behaviour, so only you can decide. */}
    <Tooltip
      anchor={() => <Button>Anchor</Button>}
      visible={false}
      ref={modalRef}
    >
      Hint
    </Tooltip>
    <OverflowMenu
      anchor={() => <Button>More</Button>}
      visible={false}
      ref={modalRef}
    />
  </>
);
