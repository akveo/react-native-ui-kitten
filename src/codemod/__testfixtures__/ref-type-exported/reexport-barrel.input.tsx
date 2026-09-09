// `Input` arrives through a local barrel. One alias hop is followed, so this still resolves.
// `Dropdown` is the barrel's alias for `Select`, and must map to `SelectRef`, not `DropdownRef`.
import React from 'react';
import { Input, Dropdown } from './_barrel';

export const inputRef = React.useRef<Input>(null);
export const dropdownRef = React.useRef<Dropdown>(null);
