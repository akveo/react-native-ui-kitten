/**
 * SVG elements an icon may be drawn with. Each maps to the react-native-svg component of the
 * same name in `evaIcon.component.tsx`.
 */
export type IconTag = 'path' | 'rect' | 'circle' | 'ellipse' | 'line' | 'polygon' | 'polyline';

/**
 * Attributes of one SVG element, already in react-native-svg prop form.
 */
export type IconAttributes = Readonly<Record<string, string | number>>;

/**
 * One SVG element: its tag and attributes.
 */
export type IconNode = readonly [tag: IconTag, attributes: IconAttributes];

/**
 * A vector icon as plain data. The generated modules under `icons/` each export one of these;
 * `EvaIcon` renders it and `createEvaIconsPack` registers it under `name`.
 */
export interface IconData {
  /** Name used with `<Icon name=... />`, e.g. `'arrow-back-outline'`. */
  readonly name: string;
  /** Root `viewBox`; `'0 0 24 24'` when omitted. */
  readonly viewBox?: string;
  /** Elements drawn inside the root `<Svg>`, in order. */
  readonly node: readonly IconNode[];
}
