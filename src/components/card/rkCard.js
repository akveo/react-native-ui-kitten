import React, {Component} from "react";
import {View} from "react-native";
import {RkComponent} from "../rkComponent";

export class RkCard extends RkComponent {

  componentName = 'RkCard';
  typeMapping = {};

  constructor(props) {
    super(props);
  }

  static attrName = 'rkCard';

  render() {
    return this._process(
      <View rkCardContainer {...this.props}>
        {this.props.children}
      </View>
    );
  }

  _process(elem) {
    let isCardAttr = prop => prop.startsWith(RkCard.attrName);

    let styles = [];
    let readyStyles = this.defineStyles();

    for (let prop in elem.props) {
      if (isCardAttr(prop)) {
        styles.push(readyStyles[this._convertAttrToStyle(prop)]);
        //  styles.push(this._defineElemStyle(this._convertAttrToStyle(prop), elem))
      }
    }

    if (elem.props) styles.push(elem.props.style);
    return this._copyElement(elem, {style: styles});
  };

  _copyElement(elem, props) {
    if (typeof elem === 'string') return elem;
    let propsToClone = ({
      ...props
    });
    if (elem.props && elem.props.children) {
      propsToClone.children = Array.isArray(elem.props.children) ?
        React.Children.map(elem.props.children, (baby) => this._process(baby)) :
        this._process(elem.props.children);
    }
    return React.cloneElement(elem, propsToClone);
  };

  // _defineElemStyle(name, elem) {
  //   let types = '';
  //   if (RkConfig.current.card) types += RkConfig.current.card.defaultType;
  //   if (this.props.rkType) types += ' ' + this.props.rkType;
  //   if (elem.props.rkType) types += ' ' + elem.props.rkType;
  //   types = types && types.length ? types.split(/\s+/) : [];
  //   types = types.filter(type => !!type);
  //   let style = [RkConfig.current.types.card["_" + name]];
  //   for (let type of types) {
  //     if (type && RkConfig.current.types.card[type])
  //       style.push(RkConfig.current.types.card[type][name])
  //   }
  //   return style;
  // }

  _convertAttrToStyle(prop) {
    let name = prop.substring(RkCard.attrName.length);
    return name.charAt(0).toLowerCase() + name.slice(1);
  };

}
