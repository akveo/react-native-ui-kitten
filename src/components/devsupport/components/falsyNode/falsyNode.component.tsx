import React from "react";
import { StyleType } from '../../../theme';

export type RenderProp<Props = {}> = (props?: Props) => React.ReactElement;

export type FalsyNodeProps<Props = {}> = Props & {
  fallback?: React.ReactElement;
  children?: React.ReactElement;
  style?: StyleType;
};

/**
 * Helper component for optional properties that should render cloned component.
 *
 * Accepts props of a component that is expected to be rendered,
 * and `children` which may be React Element only.
 *
 * If it is a React Element, will call it with props passed to this component.
 *
 * @property {RenderProp} children - React jsx component to be rendered.
 * @property {React.ReactElement} fallback - Element to render if children is null or undefined.
 *
 * @example Will render nothing.
 * ```
 * <FalsyNode />
 * ```
 *
 * @example Will render red title.
 * ```
 * const Title = () => (
 *   <FalsyNode
 *     style={{ color: 'red' }}
 *     component={props => <Text {...props}>Title</Text>}
 *   />
 * );
 * ```
 */

type ChildElement = React.ReactElement;
type ChildrenProp = ChildElement | ChildElement[];

export class FalsyNode<Props = {}> extends React.Component<FalsyNodeProps<Props>> {

  private renderChildElement = (source: ChildElement, props: Props): ChildElement => {
    return React.cloneElement(source, {
      ...props,
      style: [this.props?.style, source.props.style],
    });
  };

  private renderComponentChildren = (source: ChildrenProp, props: Props): ChildElement[] => {
    return React.Children.map(source, child => this.renderChildElement(child, props));
  };

  public render(): React.ReactElement {
    const { children, fallback, ...props } = this.props;

    if (!children) {
      return fallback || null;
    }

    return <>{this.renderComponentChildren(children, props)}</>;
  }
}
