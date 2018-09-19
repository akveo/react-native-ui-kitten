import { StyleSheet } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

export const UtilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'System',
    color: RkTheme.current.colors.text.base,
  },
  section: {
    marginTop: 14,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  bordered: {
    borderBottomColor: '#0000001A',
    borderBottomWidth: 0.5,
  },
  rowContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  columnContainer: {
    marginTop: 16,
  },
  spaceAround: {
    marginHorizontal: 5,
  },
  spaceH: {
    marginHorizontal: 5,
  },
  spaceTop: {
    marginTop: 8,
  },
  spaceBottom: {
    marginBottom: 8,
  },
  spaceVertical: {
    marginVertical: 8,
  },
  description: {
    paddingRight: 10,
    paddingLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
  exampleView: {
    paddingRight: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
  text: {
    color: RkTheme.current.colors.text.base,
  },
  codeText: {
    color: RkTheme.current.colors.danger,
  },
  tab: {
    paddingLeft: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  column: {
    flexDirection: 'column',
  },
  tabContent: {
    fontSize: 32,
    alignSelf: 'center',
    padding: 30,
    color: RkTheme.current.colors.grey500,
  },
});
