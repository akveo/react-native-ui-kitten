import React from 'react';
import {
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';

/**
 * `RkCard` component used to render card view in your application.
 * It's usually being used with its props applied to standard react or custom components.
 *
 * @extends React.Component
 *
 * @example Usage example:
 *
 * ```
 * <RkCard>
 *   <View rkCardHeader>
 *     <Text>Header</Text>
 *   </View>
 *   <Image rkCardImg source={require('../img/sea.jpg')}/>
 *   <View rkCardContent>
 *     <Text> quick brown fox jumps over the lazy dog</Text>
 *   </View>
 *   <View rkCardFooter>
 *     <Text>Footer</Text>
 *   </View>
 * </RkCard>
 * ```
 *
 * @style There are 6 `RkCard` nested element props
 * which can be applied to elements inside `RkCard`:
 * - `rkCardContainer` : Used for styling root card container
 * - `rkCardHeader` : Used for styling header of card
 * - `rkCardImg` : Used for styling image content in card
 * - `rkCardImgOverlay` : Used for styling component which will be displayed over the image
 * - `rkCardContent` : Used for styling content
 * - `rkCardFooter` : Used for styling footer of card
 *
 * @example Using rkType prop
 *
 * `RkCard` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkCard rkType='shadowed'>
 *   <View rkCardHeader>
 *     <Text>Header</Text>
 *   </View>
 *   <View rkCardContent>
 *     <Text>Shadowed card</Text>
 *   </View>
 * </RkCard>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
 * `rkType` used here to set style for each of 6 `rkCard` nested element props.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkCard', 'story', {
 *   img: {
 *     height: 100,
 *     opacity: 0.7
 *   },
 *   header: {
 *     alignSelf: 'center'
 *   },
 *   content:{
 *     alignSelf:'center'
 *   }
 * });
 *
 * //...
 *
 * <RkCard rkType='story'>
 *   <Image rkCardImg source={require('../img/sea.jpg')}/>
 *   <View rkCardHeader>
 *     <RkText rkType='header'>Once upon a time</RkText>
 *   </View>
 *   <View rkCardContent>
 *     <RkText style={{textAlign:'center'}}>
 *       One morning, when Gregor Samsa woke from happy dreams,
 *       he found himself transformed in ...
 *     </RkText>
 *   </View>
 *   <View rkCardFooter>
 *     <RkButton rkType='small outline'>Learn More</RkButton>
 *     <RkButton rkType='small'>Read later</RkButton>
 *   </View>
 * </RkCard>
 *
 * @styles Nested components available for styling:
 * - `container` (default): Style key for `rkCardContainer`.
 * - `header` : Style key for `rkCardHeader`
 * - `content` : Style key for `rkCardContent`
 * - `footer` : Style key for `rkCardFooter`
 * - `img` : Style key for `rkCardImg`
 * - `imgOverlay` : Style key for `rkCardImgOverlay`
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkCard` supports following types: `shadowed`, `heroImage`
 * @property {style} style - Style for root container of `RkCard`
 */
export class RkCard extends RkComponent {
  static attrName = 'rkCard';
  static propTypes = {
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };
  static defaultProps = {
    style: null,
    children: [],
  };
  componentName = 'RkCard';
  typeMapping = {
    container: {},
    header: {},
    content: {},
    footer: {},
    img: {},
    imgOverlay: {},
  };

  mapPropAttributeToStyle(prop) {
    const name = prop.substring(RkCard.attrName.length);
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  cloneView(view, props, styles) {
    const cloneProps = { ...props };
    if (view.props && view.props.children) {
      const subviewMapping = subview => this.renderChildView(subview, styles);
      cloneProps.children = React.Children.map(view.props.children, subviewMapping);
    }
    return React.cloneElement(view, cloneProps);
  }

  renderChildView(view, styles) {
    return view ? this.renderView(view, styles) : null;
  }

  renderView(view, styles) {
    const viewStyles = Object.keys(view.props || {})
      .filter(prop => prop.startsWith(RkCard.attrName))
      .map(prop => styles[this.mapPropAttributeToStyle(prop)]);
    if (view.props) {
      viewStyles.push(view.props.style);
    }
    return typeof view === 'string' ? view : this.cloneView(view, { style: viewStyles }, styles);
  }

  render() {
    const { container, ...containerStyles } = this.defineStyles();
    const { style, ...viewProps } = this.props;
    return this.renderView(
      <View rkCardContainer={true} style={[container, style]} {...viewProps}>
        {this.props.children}
      </View>,
      containerStyles,
    );
  }
}
