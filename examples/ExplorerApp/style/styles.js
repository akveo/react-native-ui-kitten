import {
  StyleSheet,
} from 'react-native';
import {
  RkTheme
} from "react-native-ui-kitten"

export const UtilStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'System',
    color: RkTheme.current.colors.text.default
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: RkTheme.current.colors.background.secondary,

  },
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  spaceAround: {
    marginHorizontal: 5
  },
  spaceH: {
    marginHorizontal: 5
  },
  spaceV: {
    marginVertical: 5
  },
  description: {
    paddingRight: 10,
    paddingLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex:1
  },
  exampleView:{

  },
  text:{
    color: RkTheme.current.colors.text.default,
  },
  codeText: {
    color: RkTheme.current.colors.main.accent,
    backgroundColor: RkTheme.current.colors.lightGreen200,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    marginHorizontal: 2,
  },
  tab: {
    marginLeft: 25,
  },
  row :{
    flexDirection: 'row'
  },
  column :{
    flexDirection: 'column'
  },
  tabContent:{
    fontSize: 32,
    alignSelf: 'center',
    padding: 30,
    color: RkTheme.current.colors.grey500
  }
});
