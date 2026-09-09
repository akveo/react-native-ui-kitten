// None of these ref types can be named: `Button`/`ListItem` forward `TouchableWeb`, which lives
// behind the `devsupport` subpath; `Text` forwards react-native's `Text`, which collides with the
// UI Kitten `Text` already imported; `ViewPager`/`TabBar` forward types v6 does not export.
import React from 'react';
import { Button, ListItem, Popover, TabBar, Text, ViewPager } from '@ui-kitten/components';

export const buttonRef = React.useRef<Button>(null);
export const listItemRef = React.useRef<ListItem>(null);
export const popoverRef = React.useRef<Popover>(null);
export const tabBarRef = React.useRef<TabBar>(null);
export const textRef: React.RefObject<Text> = React.createRef();
export const pagerRef = React.useRef<ViewPager>(null);
