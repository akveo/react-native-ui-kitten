// None of these ref types can be named: `Button`/`ListItem` forward `TouchableWeb`, which lives
// behind the `devsupport` subpath; `Text` forwards react-native's `Text`, which collides with the
// UI Kitten `Text` already imported; `ViewPager`/`TabBar` forward types v6 does not export.
import React from 'react';
import { Button, ListItem, Popover, TabBar, Text, ViewPager } from '@ui-kitten/components';

export const buttonRef = React.useRef<React.ComponentRef<typeof Button>>(null);
export const listItemRef = React.useRef<React.ComponentRef<typeof ListItem>>(null);
export const popoverRef = React.useRef<React.ComponentRef<typeof Popover>>(null);
export const tabBarRef = React.useRef<React.ComponentRef<typeof TabBar>>(null);
export const textRef: React.RefObject<React.ComponentRef<typeof Text>> = React.createRef();
export const pagerRef = React.useRef<React.ComponentRef<typeof ViewPager>>(null);
