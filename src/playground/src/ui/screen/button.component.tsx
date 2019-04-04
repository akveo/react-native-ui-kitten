import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  Image,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import { Button } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const APPEARANCE: string = 'filled';
const STATUS: string = 'primary';
const ALIGNMENT: string = 'left';
const TEXT: React.ReactText = 'BUTTON';
const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

class ButtonScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Button',
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Icon</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
            />
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
            />
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
            />
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
            />
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Text</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Icon and Text</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}
              alignment={ALIGNMENT}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}>
              {TEXT}
            </Button>
            <Button
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}
              icon={(style: StyleType) => <Image source={ICON} style={style}/>}>
              {TEXT}
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(ButtonScreen, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSection: {
    marginVertical: 16,
  },
  containerPreview: {
    alignItems: 'center',
    marginTop: 4,
  },
  containerPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  textDescription: {
    fontSize: 18,
  },
  component: {
    margin: 4,
  },
}));
