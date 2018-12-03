import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import { DesignType } from '@rk-kit/design';
import { DesignProvider } from './designProvider.component';
import { withDesign } from './designConsumer.component';
import { ThemeType } from '../theme';
import {
  getComponentDesign,
  getComponentMappings,
  getComponentVariant,
  getDesignToken,
  getVariantTokens,
} from '../../service';

const designConsumerTestId = '@design/consumer';

class CheckBox extends React.Component<any> {
  static defaultProps = {
    testID: designConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

describe('@design: design consumer checks', () => {

  it('renders properly', async () => {
    const DesignedComponent = withDesign(CheckBox);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent).not.toBeNull();
    expect(designedComponent).not.toBeUndefined();
  });

  it('receives design prop', async () => {
    const DesignedComponent = withDesign(CheckBox);

    const component = render(
      <DesignProvider>
        <DesignedComponent/>
      </DesignProvider>,
    );

    const designedComponent = component.getByTestId(designConsumerTestId);
    expect(designedComponent.props.design).not.toBeNull();
    expect(designedComponent.props.design).not.toBeUndefined();
  });

});

describe('@design: service methods checks', () => {

  const mappings = {
    testDefault: [
      {
        parameter: 'backgroundColor',
        token: 'backgroundColorTestDefault',
      },
      {
        parameter: 'textColor',
        token: 'textColorTestDefault',
      },
    ],
    testDark: [
      {
        parameter: 'backgroundColor',
        token: 'backgroundColorTestDark',
      },
    ],
    mockBackground: [
      {
        parameter: 'backgroundColor',
        token: 'backgroundColorTestDefault',
      },
    ],
  };

  const variants = {
    testDefault: {
      name: 'default',
      mapping: mappings.testDefault,
    },
    testDark: {
      name: 'dark',
      mapping: mappings.testDark,
    },
    mockDefault: {
      name: 'default',
      mapping: mappings.mockBackground,
    },
  };

  const design1 = {
    name: 'Test',
    parameters: [
      {
        name: 'backgroundColor',
      },
    ],
    variants: [variants.testDefault, variants.testDark],
  };

  const design2 = {
    name: 'Mock',
    parameters: [
      {
        name: 'backgroundColor',
      },
    ],
    variants: [variants.mockDefault],
  };

  const values = {
    backgroundDefault: '#ffffff',
    backgroundDark: '#000000',
    textDefault: '#000000',
    textDark: '#ffffff',
    textSuccess: '#00E676',
  };

  const theme: ThemeType = {
    backgroundColorTestDefault: values.backgroundDefault,
    backgroundColorTestDark: values.backgroundDark,
    textColorTestDefault: values.textDefault,
    textColorTestSuccess: values.textSuccess,
  };

  const design: DesignType[] = [design1, design2];

  it('finds design properly', async () => {
    const componentDesign = getComponentDesign('Test', design);

    expect(componentDesign).not.toBeNull();
    expect(componentDesign).not.toBeUndefined();
    expect(JSON.stringify(componentDesign)).toEqual(JSON.stringify(design1));
  });

  it('finds variant properly', async () => {
    const componentVariant = getComponentVariant('default', design1);

    expect(componentVariant).not.toBeNull();
    expect(componentVariant).not.toBeUndefined();
    expect(JSON.stringify(componentVariant)).toEqual(JSON.stringify(variants.testDefault));
  });

  it('finds mappings properly', async () => {
    const componentMappings = getComponentMappings(design1);

    expect(componentMappings).not.toBeNull();
    expect(componentMappings).not.toBeUndefined();
    expect(JSON.stringify(componentMappings)).toEqual(JSON.stringify(mappings.testDefault));
  });

  it('finds token properly', async () => {
    const designToken = getDesignToken('backgroundColorTestDefault', theme);

    expect(designToken).not.toBeNull();
    expect(designToken).not.toBeUndefined();
    expect(designToken).not.toEqual(values.backgroundDefault);
  });

  it('finds mapping tokens properly', async () => {
    const { backgroundColorTestDefault, textColorTestDefault } = getVariantTokens(theme, design1);

    expect(backgroundColorTestDefault).not.toBeNull();
    expect(backgroundColorTestDefault).not.toBeUndefined();
    expect(textColorTestDefault).not.toBeNull();
    expect(textColorTestDefault).not.toBeUndefined();
  });

});
