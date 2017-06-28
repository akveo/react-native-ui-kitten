import React from "react";
import {View} from "react-native";
import {RkComponent} from "../rkComponent";

/**
 * `RkCard` component used to render card view in your application.
 * It's usually being used with its props applied to standard react or custom components.
 *
 * @extends RkComponent
 *
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
 * @style There are 6 `RkCard` nested element props which can be applied to elements inside `RkCard`:
 * - `rkCardContainer` : Used for styling root card container
 * - `rkCardHeader` : Used for styling header of card
 * - `rkCardImg` : Used for styling image content in card
 * - `rkCardImgOverlay` : Used for styling component which will be displayed over the image
 * - `rkCardContent` : Used for styling content
 * - `rkCardFooter` : Used for styling footer of card
 *
 * @example Using rkType prop
 *
 * `RkCard` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
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
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
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
 * @styles Nested element props available for styling:
 * - `container` : Style key for `rkCardContainer`
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

  componentName = 'RkCard';
  typeMapping = {
    container: {},
    header: {},
    content: {},
    footer: {},
    img: {},
    imgOverlay: {}
  };

  constructor(props) {
    super(props);
  }

  _process(elem, readyStyles) {
    let isCardAttr = prop => prop.startsWith(RkCard.attrName);

    let styles = [];

    for (let prop in elem.props) {
      if (isCardAttr(prop)) {
        styles.push(readyStyles[this._convertAttrToStyle(prop)]);
      }
    }

    if (elem.props) styles.push(elem.props.style);
    return this._copyElement(elem, {style: styles}, readyStyles);
  };

  _copyElement(elem, props, readyStyles) {
    if (typeof elem === 'string') return elem;
    let propsToClone = ({
      ...props
    });
    if (elem.props && elem.props.children) {
      propsToClone.children = Array.isArray(elem.props.children) ?
        React.Children.map(elem.props.children, (child) => this._process(child, readyStyles)) :
        this._process(elem.props.children, readyStyles);
    }
    return React.cloneElement(elem, propsToClone);
  };

  _convertAttrToStyle(prop) {
    let name = prop.substring(RkCard.attrName.length);
    return name.charAt(0).toLowerCase() + name.slice(1);
  };

  render() {
    let {container, ...definedStyles} = this.defineStyles();
    let {style, ...viewProps} = this.props;
    return this._process(
      <View rkCardContainer style={[container, style]} {...viewProps}>
        {this.props.children}
      </View>, definedStyles
    );
  }
}
