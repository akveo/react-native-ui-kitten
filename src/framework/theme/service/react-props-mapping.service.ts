import React, { ComponentType } from 'react';

const REACT_METHODS = [
  'autobind',
  'childContextTypes',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillMount',
  'componentWillReceiveProps',
  'componentWillUnmount',
  'componentWillUpdate',
  'contextTypes',
  'displayName',
  'getChildContext',
  'getDefaultProps',
  'getDOMNode',
  'getInitialState',
  'mixins',
  'propTypes',
  'render',
  'replaceProps',
  'setProps',
  'shouldComponentUpdate',
  'statics',
  'updateComponent',
];

export function forwardProps<P>(Source: ComponentType<P>, Target: ComponentType<P>): ComponentType<P> {
  function filterProps(prop) {
    // React specific methods and properties or properties from React's prototype
    const isReactProp = REACT_METHODS.includes(prop) || prop in React.Component.prototype;
    // Properties from enhanced component's prototype
    const isTargetProp = prop in Target.prototype;
    // Private methods
    const isPrivateProp = prop.startsWith('_');

    return !(isReactProp || isTargetProp || isPrivateProp);
  }

  function mapProps(prop) {
    if (typeof Source.prototype[prop] === 'function') {
      // Make sure the function is called with correct context
      Target.prototype[prop] = function (...args) {
        return Source.prototype[prop].apply(this.getConsumingComponent(), args);
      };
    } else {
      // Copy properties as getters and setters
      Object.defineProperty(Target.prototype, prop, {
        get() {
          return this.getConsumingComponent()[prop];
        },
        set(value) {
          this.getConsumingComponent()[prop] = value;
        },
      });
    }
  }

  Object.getOwnPropertyNames(Source.prototype).filter(filterProps).forEach(mapProps);

  return Target;
}
