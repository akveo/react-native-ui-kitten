import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  ScrollView,
  ImageProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
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

  private renderIcon = (): React.ReactElement<ImageProps> => {
    return (
      <Button.Icon source={ICON} />
    );
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
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
              <ButtonGroup.Button icon={this.renderIcon}/>
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
              <ButtonGroup.Button>Left</ButtonGroup.Button>
              <ButtonGroup.Button>Mid</ButtonGroup.Button>
              <ButtonGroup.Button>Right</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='large'>
              <ButtonGroup.Button>Left</ButtonGroup.Button>
              <ButtonGroup.Button>Mid</ButtonGroup.Button>
              <ButtonGroup.Button>Right</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='medium'>
              <ButtonGroup.Button>Left</ButtonGroup.Button>
              <ButtonGroup.Button>Mid</ButtonGroup.Button>
              <ButtonGroup.Button>Right</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='small'>
              <ButtonGroup.Button>Left</ButtonGroup.Button>
              <ButtonGroup.Button>Mid</ButtonGroup.Button>
              <ButtonGroup.Button>Right</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              size='tiny'>
              <ButtonGroup.Button>Left</ButtonGroup.Button>
              <ButtonGroup.Button>Mid</ButtonGroup.Button>
              <ButtonGroup.Button>Right</ButtonGroup.Button>
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
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='large'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='medium'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='small'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE_OUTLINE}
              size='tiny'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
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
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='success'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='info'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='warning'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
            </ButtonGroup>
            <ButtonGroup
              style={themedStyle.component}
              appearance={APPEARANCE}
              status='danger'>
              <ButtonGroup.Button icon={this.renderIcon}>L</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>M</ButtonGroup.Button>
              <ButtonGroup.Button icon={this.renderIcon}>R</ButtonGroup.Button>
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
