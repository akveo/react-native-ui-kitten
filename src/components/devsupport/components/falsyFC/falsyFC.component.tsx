import React from 'react';

export type RenderFCProp<Props = {}> = (props?: Props) => React.ReactElement;

export type RenderProp<Props = {}> = RenderFCProp<Props> | React.ReactElement

export type FalsyFCProps<Props = {}> = Props & {
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
export class FalsyFC<Props = {}> extends React.Component<FalsyFCProps<Props>> {

  public render(): React.ReactElement {
    const { component, fallback, ...props } = this.props;

    if (!component) {
      return fallback || null;
    }

    if (React.isValidElement(component)) {
      return React.cloneElement(component, props);
    }

    return React.createElement(component as RenderFCProp<Props>, props as Props);
  }
}
