import React, { createElement, forwardRef } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  SvgProps,
} from 'react-native-svg';
import { IconData, IconTag } from './iconData';

const DEFAULT_VIEW_BOX = '0 0 24 24';

const SHAPES: Record<IconTag, React.ComponentType<Record<string, unknown>>> = {
  path: Path,
  rect: Rect,
  circle: Circle,
  ellipse: Ellipse,
  line: Line,
  polygon: Polygon,
  polyline: Polyline,
};

/**
 * `ViewStyle` plus the `tintColor` UI Kitten components set from the theme.
 */
export interface EvaIconStyle extends ViewStyle {
  tintColor?: ColorValue;
}

export interface EvaIconSvgProps extends Omit<SvgProps, 'style'> {
  style?: StyleProp<EvaIconStyle>;
}

export interface EvaIconProps extends EvaIconSvgProps {
  icon: IconData;
}

export type EvaIconComponent = React.ForwardRefExoticComponent<EvaIconSvgProps & React.RefAttributes<Svg>>;

/**
 * Renders icon data with react-native-svg.
 *
 * UI Kitten components pass the themed colour as `tintColor` inside `style`; it becomes the root
 * `fill`, which every shape inherits, and the root `color`, so `currentColor` resolves to it too.
 * Any explicit `fill` or `color` prop wins over the tint.
 *
 * @example
 * import { EvaIcon } from '@ui-kitten/eva-icons';
 * import star from '@ui-kitten/eva-icons/icons/star';
 *
 * <EvaIcon icon={star} fill='#FFAA00' width={24} height={24} />
 */
export const EvaIcon = forwardRef<Svg, EvaIconProps>(({ icon, style, ...svgProps }, ref) => {
  const tintColor = StyleSheet.flatten(style)?.tintColor;

  return (
    <Svg
      ref={ref}
      viewBox={icon.viewBox ?? DEFAULT_VIEW_BOX}
      style={style}
      fill={tintColor}
      color={tintColor}
      {...svgProps}
    >
      {icon.node.map(([tag, attributes], index) => createElement(SHAPES[tag], { key: index, ...attributes }))}
    </Svg>
  );
});

EvaIcon.displayName = 'EvaIcon';

const toPascalCase = (name: string): string => {
  return name.replace(/(^|-)([a-z0-9])/g, (_match, _separator, character: string) => character.toUpperCase());
};

/**
 * Wraps icon data in a standalone component, for use outside `<Icon name=... />`.
 *
 * @example
 * import { createEvaIcon } from '@ui-kitten/eva-icons';
 * import star from '@ui-kitten/eva-icons/icons/star';
 *
 * const Star = createEvaIcon(star);
 * <Star fill='#FFAA00' width={24} height={24} />
 */
export const createEvaIcon = (icon: IconData): EvaIconComponent => {
  const Component = forwardRef<Svg, EvaIconSvgProps>((props, ref) => (
    <EvaIcon
      ref={ref}
      icon={icon}
      {...props}
    />
  ));
  Component.displayName = toPascalCase(icon.name);
  return Component;
};
