import React from 'react';
import { RenderProp } from '../falsyFC/falsyFC.component';
import {
  Text,
  TextProps,
} from '../../../ui/text/text.component';

export interface FalsyTextProps extends Omit<TextProps, 'children'> {
  component?: RenderProp<TextProps> | React.ReactText;
}

/**
 * Helper component for optional text properties.
 *
 * Accepts same props as Text component,
 * and `component` which may be a string, a function, null or undefined.
 *
 * If it is null or undefined, will render nothing.
 * If it is a function, will call it with props passed to this component.
 * Otherwise, will render a Text with props passed to this component.
 *
 * @example Will render nothing.
 * ```
 * <FalsyText />
 * ```
 *
 * @example Will render red title.
 * ```
 * const Title = () => (
 *   <FalsyText style={{ color: 'red' }} component='Title' />
 * );
 * ```
 *
 * @example Will render image and red title.
 * ```
 * const renderTitle = (props) => (
 *   <React.Fragment>
 *     <Image source={require('../asset.png')}/>
 *     <Text {...props}>Title</Text>
 *   </React.Fragment>
 * );
 *
 * const Title = () => (
 *   <FalsyText
 *     style={{ color: 'red' }}
 *     component={renderTitle}
 *   />
 * );
 * ```
 */
export class FalsyText extends React.Component<FalsyTextProps> {

  public render(): React.ReactElement {
    const { component, ...textProps } = this.props;

    if (!component) {
      return null;
    }

    if (React.isValidElement(component)) {
      return React.cloneElement(component, textProps as TextProps);
    }

    if (typeof component === 'function') {
      return React.createElement(component, textProps as TextProps);
    }

    return (
      <Text {...textProps}>
        {component}
      </Text>
    );
  }
}
