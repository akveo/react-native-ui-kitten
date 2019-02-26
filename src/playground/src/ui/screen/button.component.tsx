import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Button as ButtonComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

const APPEARANCE: string = 'default';
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

class Button extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Button',
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Icon</Text>
          <View style={this.props.themedStyle.containerPreviewRow}>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}
              icon={ICON}
            />
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              alignment={ALIGNMENT}
              icon={ICON}
            />
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}
              icon={ICON}
            />
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}
              icon={ICON}
            />
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}
              icon={ICON}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Text</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Icon and Text</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='giant'
              alignment={ALIGNMENT}
              icon={ICON}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='large'
              icon={ICON}
              alignment={ALIGNMENT}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='medium'
              alignment={ALIGNMENT}
              icon={ICON}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='small'
              alignment={ALIGNMENT}
              icon={ICON}>
              {TEXT}
            </ButtonComponent>
            <ButtonComponent
              appearance={APPEARANCE}
              style={this.props.themedStyle.component}
              status={STATUS}
              size='tiny'
              alignment={ALIGNMENT}
              icon={ICON}>
              {TEXT}
            </ButtonComponent>
          </View>
        </View>
      </View>
    );
  }
}

export const ButtonScreen = withStyles(Button, (theme: ThemeType) => ({
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
