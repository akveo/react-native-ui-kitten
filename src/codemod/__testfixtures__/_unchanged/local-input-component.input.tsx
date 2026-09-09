// `Input` here is the app's own class. Nothing in this file comes from UI Kitten, so nothing in it
// may be touched — this is the single most likely way a codemod corrupts a codebase.
import React from 'react';

export class Input extends React.Component<{ value: string }> {
  public focus(): void { /* no-op */ }

  public render(): React.ReactElement | null { return null; }
}

export const inputRef = React.useRef<Input>(null);
export const other: React.RefObject<Input | null> = React.createRef();
