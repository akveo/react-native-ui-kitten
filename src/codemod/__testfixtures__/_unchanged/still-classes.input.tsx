// These five are still classes in v6, so `useRef<MenuGroup>()` remains valid. A rule that rewrote
// "every UI Kitten name in a type position" would corrupt all of them.
import React from 'react';
import {
  AutocompleteItem,
  DrawerGroup,
  IconRegistry,
  MenuGroup,
  SelectGroup,
} from '@ui-kitten/components';

export const menuGroupRef = React.useRef<MenuGroup>(null);
export const selectGroupRef = React.useRef<SelectGroup>(null);
export const drawerGroupRef = React.useRef<DrawerGroup>(null);
export const autocompleteItemRef = React.useRef<AutocompleteItem>(null);
export const iconRegistryRef = React.useRef<IconRegistry>(null);
