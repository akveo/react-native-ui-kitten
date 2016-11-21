import React, {Component} from "react";
import {View} from "react-native";
import {RkConfig} from "../../util/config";


export class RkCard extends Component {

  static name = 'card';


  constructor(props) {
    super(props);
  }

  static attrName = 'rkCard';

  render() {
    let {
      style,
      ...props
    } = this.props;
    return this._process(
      <View rkCardContainer style={style} {...props}>
        {this.props.children}
      </View>
    );
  }

  _process(elem) {
    let isCardAttr = prop => prop.startsWith(RkCard.attrName);
    let convertAttrToStyle = prop => {
      let name = prop.substring(RkCard.attrName.length);
      return name.charAt(0).toLowerCase() + name.slice(1);
    };
    let styles = [];
    for(let prop in elem.props){
      if(isCardAttr(prop)){
        styles.push(this._defineElemStyle(convertAttrToStyle(prop), elem))
      }
    }
    styles = elem.props ? [elem.props.style].concat(styles): [];
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

  _defineElemStyle(name, elem) {
    let types = '';
    if (RkConfig.theme.card) types += RkConfig.theme.card.defaultType;
    if (this.props.rkType) types += ' ' + this.props.rkType;
    if (elem.props.rkType) types += ' ' + elem.props.rkType;
    types = types && types.length ? types.split(/\s+/) : [];
    types = types.filter(type => !!type);
    let style = [RkConfig.themes.styles.card["_" + name]];
    for (let type of types) {
      if (type && RkConfig.themes.styles.card[type])
        style.push(RkConfig.themes.styles.card[type][name])
    }
    return style;
  }

}
