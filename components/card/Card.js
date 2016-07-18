import React, {Component} from 'react';

import {
  View,
} from 'react-native';

import { RkConfig} from '../../config/config';


export class RkCard extends Component {


  constructor(props) {
    super(props);
  }

  _propsStyleMap = {
    rkCardHeader: 'header',
    rkCardContent: 'content',
    rkCardFooter: 'footer',
    rkCardTitle: 'title',
    rkCardSubTitle: 'subTitle',
    rkCardFullImg: 'fullImg'
  };

  render() {
    let {
      type,
      style,
      ...props
      } = this.props;
    let children = this._processChildren();

    return (
      <View style={[style, this._defineElemStyle('container', this)]}>
        {children}
      </View>
    );
  }

  _processChildren() {

    let copyElement = (elem, props) =>{
      if(elem.props && elem.props.children){
        let children = Array.isArray(elem.props.children) ?
          React.Children.map(elem.props.children, process) :
          process(elem.props.children);
        return React.cloneElement(elem, {
          children: children,
          ...props
        });
      } else if(typeof elem !== 'string'){
        return React.cloneElement(elem, {
          ...props
        });
      }
      return elem;
    };

    let process = (elem) => {
      if(elem.props){
        for(let prop in elem.props){
          if(this._propsStyleMap[prop]){
            return copyElement(elem, {style: this._defineElemStyle(this._propsStyleMap[prop], elem)})
          }
        }
      }
      return copyElement(elem, {});
    };

    return React.Children.map(this.props.children, process);
  }

  _defineElemStyle(name, elem) {
    let types = elem.props.type || this.props.type || (RkConfig.theme.card ? RkConfig.theme.card.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let style = [RkConfig.themes.styles.card["_" + name]];
    for (type of types) {
      style.push(RkConfig.themes.styles.card[type][name])
    }
    style.push(elem.props.style)
    return style;
  }

}
