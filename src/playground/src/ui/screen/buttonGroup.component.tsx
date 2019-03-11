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
import {
  Button,
  ButtonGroup as ButtonGroupComponent,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const APPEARANCE: string = 'filled';
const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

class ButtonGroup extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Button Group',
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Icon</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='giant'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroupComponent>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Text</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='giant'>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroupComponent>
            <ButtonGroupComponent
              style={this.props.themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroupComponent>
          </View>
        </View>
      </View>
    );
  }
}

export const ButtonGroupScreen = withStyles(ButtonGroup, (theme: ThemeType) => ({
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
