// The exact v5 form from the docs. `Icon<T>` had no default type parameter, so every v5 use spells
// the argument out — and `IconRef` is not generic, so the argument has to go.
import React from 'react';
import { ImageProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Icon, IconElement, List, IconRef, ListRef } from '@ui-kitten/components';

export const zoomIconRef = React.useRef<IconRef>(null);
export const svgIconRef = React.useRef<IconRef>(null);
export const listRef = React.useRef<ListRef>(null);
export const anyListRef: React.Ref<ListRef> = null;

export const renderIcon = (): IconElement => <Icon name='star' />;
