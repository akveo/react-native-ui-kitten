import React, {Component} from "react";
import {View} from "react-native";
import {RkComponent} from "../rkComponent";

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

  render() {
    let {container, ...definedStyles} = this.defineStyles();
    let {style, ...viewProps} = this.props;
    return this._process(
      <View rkCardContainer style={[container, style]} {...viewProps}>
        {this.props.children}
      </View>, definedStyles
    );
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
        React.Children.map(elem.props.children, (baby) => this._process(baby, readyStyles)) :
        this._process(elem.props.children, readyStyles);
    }
    return React.cloneElement(elem, propsToClone);
  };

  _convertAttrToStyle(prop) {
    let name = prop.substring(RkCard.attrName.length);
    return name.charAt(0).toLowerCase() + name.slice(1);
  };

}
