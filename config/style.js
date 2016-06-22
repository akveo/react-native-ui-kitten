
import _ from "lodash";

import {
  Colors
} from './color';


export const RkStyle = _.merge({
    rounded:{
      borderRadius: 1000,
    },
    card:{
      card: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,
        shadowColor: Colors.gray,
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      header: {
        flexDirection: 'row'
      },
      content: {
        marginVertical: 10
      },
      footer: {
        flexDirection: 'row'
      },
      avatarImg: {
        width: 75,
        height: 75,
        borderRadius: 37.5
      },
      titleContainer: {
        marginLeft: 10,
        justifyContent: 'center'
      },
      title: {
        fontSize: 16,
        color: Colors.primary,
      },
      subTitle: {
        marginTop: 5,
        color: Colors.gray,
        fontSize: 12
      },
      headerControls:{
        flex:1,
        alignItems: 'flex-end'
      },
      fullImage:{
        width: null,
      },
      leftControls:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      rightControls:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
    }
  }, createColorsStyles(Colors))


function createColorsStyles(colors) {
  let styleObject = {};
  for (let colorName in colors) {
    styleObject[colorName + 'Text'] = {
      color: colors[colorName]
    };
    styleObject[colorName + 'Bg'] = {
      backgroundColor: colors[colorName]
    };
    styleObject[colorName + 'Border'] = {
      borderColor: colors[colorName]
    };
  }
  return styleObject;
}