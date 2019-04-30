import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  Image,
  ScrollView,
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
  ButtonGroup,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const APPEARANCE: string = 'filled';
const APPEARANCE_OUTLINE: string = 'outline';
const ICON: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

class ButtonGroupScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Button Group',
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollView
        style={themedStyle.container}
        contentContainerStyle={themedStyle.content}>
        <View style={themedStyle.containerSection}>
          <Text style={themedStyle.textDescription}>Icon</Text>
          <View style={themedStyle.containerPreview}>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='giant'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}/>
            </ButtonGroup>
          </View>
        </View>
        <View style={themedStyle.containerSection}>
          <Text style={themedStyle.textDescription}>Text</Text>
          <View style={themedStyle.containerPreview}>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='giant'>
              <Button>Left</Button>
              <Button>Mid</Button>
              <Button>Right</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <Button>Left</Button>
              <Button>Mid</Button>
              <Button>Right</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <Button>Left</Button>
              <Button>Mid</Button>
              <Button>Right</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <Button>Left</Button>
              <Button>Mid</Button>
              <Button>Right</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <Button>Left</Button>
              <Button>Mid</Button>
              <Button>Right</Button>
            </ButtonGroup>
          </View>
        </View>
        <View style={themedStyle.containerSection}>
          <Text style={themedStyle.textDescription}>Outline Icon + Text</Text>
          <View style={themedStyle.containerPreview}>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='giant'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='large'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='medium'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='small'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='tiny'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
          </View>
        </View>
        <View style={themedStyle.containerSection}>
          <Text style={themedStyle.textDescription}>Status</Text>
          <View style={themedStyle.containerPreview}>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='primary'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='success'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='info'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='warning'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='danger'>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>L</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>M</Button>
              <Button icon={(style: StyleType) => <Image source={ICON} style={style}/>}>R</Button>
            </ButtonGroup>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withStyles(ButtonGroupScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  content: {
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
