// The exact v5 form from the docs. `Icon<T>` had no default type parameter, so every v5 use spells
// the argument out — and `IconRef` is not generic, so the argument has to go.
import React from 'react';
import { ImageProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Icon, IconElement, List } from '@ui-kitten/components';

export const zoomIconRef = React.useRef<Icon<Partial<ImageProps>>>(null);
export const svgIconRef = React.useRef<Icon<SvgProps>>(null);
export const listRef = React.useRef<List<string>>(null);
export const anyListRef: React.Ref<List> = null;

export const renderIcon = (): IconElement => <Icon name='star' />;
