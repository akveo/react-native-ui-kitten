import React from 'react';

export type RenderFCProp<Props = unknown> = (props?: Props) => React.ReactElement;

export type RenderProp<Props = unknown> = RenderFCProp<Props> | React.ReactElement;

export type FalsyFCProps<Props> = Props & {
  component?: RenderProp<Props>;
  fallback?: React.ReactElement;
};

/**
 * Helper component for optional properties that should render a component.
 *
 * Accepts props of a component that is expected to be rendered,
 * and `component` which may be a string, a function, null or undefined.
 *
 * If it is a function, will call it with props passed to this component.
 * Otherwise, will return null.
 *
 * @property {RenderProp} component - Function component to be rendered.
 * @property {React.ReactElement} fallback - Element to render if children is null or undefined.
 *
 * @example Will render nothing.
 * ```
 * <FalsyFC />
 * ```
 *
 * @example Will render red title.
 * ```
 * const Title = () => (
 *   <FalsyFC
 *     style={{ color: 'red' }}
 *     component={props => <Text {...props}>Title</Text>}
 *   />
 * );
 * ```
 */
/*
 * `cloneElement` replaces props, so a style passed by the parent (a Button's text style, an
 * Input's icon style) used to wipe out whatever style the element itself was created with. The
 * element's own style is appended so it wins over the parent's defaults.
 */
export const mergeElementStyle = <P extends { style?: unknown }>(element: React.ReactElement, props: P): P => {
  const ownStyle = (element.props as { style?: unknown })?.style;

  if (ownStyle === undefined) {
    return props;
  }

  return { ...props, style: [props.style, ownStyle] };
};

export class FalsyFC<Props> extends React.Component<FalsyFCProps<Props>> {

  public render(): React.ReactElement {
    const { component, fallback, ...props } = this.props;

    if (!component) {
      return fallback || null;
    }

    if (React.isValidElement(component)) {
      return React.cloneElement(component, mergeElementStyle(component, props));
    }

    return React.createElement(component as RenderFCProp<Props>, props as Props);
  }
}
