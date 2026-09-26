import React from 'react';
import { Text as RNText } from 'react-native';
import { render } from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../../theme';
import { Text } from '../../../ui/text/text.component';
import { FalsyText } from './falsyText.component';

describe('@falsy-text: component checks', () => {

  const completeStyle = { color: '#000', fontFamily: 'System', fontSize: 15, fontWeight: '400' as const };

  const wrap = (element: React.ReactElement): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      {element}
    </ApplicationProvider>
  );

  it('should render nothing for a falsy component', () => {
    const component = render(wrap(<FalsyText component={undefined} />));
    expect(component.toJSON()).toBeNull();
  });

  it('should render a plain RN Text when the parent supplies a complete text style', () => {
    const component = render(wrap(
      <FalsyText
        testID='label'
        style={completeStyle}
        component='Label'
      />,
    ));

    expect(component.UNSAFE_queryAllByType(Text).length).toEqual(0);
    expect(component.UNSAFE_queryAllByType(RNText).length).toEqual(1);
    expect(component.getByTestId('label').props.style).toEqual(completeStyle);
    expect(component.getByText('Label')).toBeTruthy();
  });

  it('should keep the styled Text when the style is incomplete', () => {
    const component = render(wrap(
      <FalsyText
        testID='label'
        style={{ color: '#000' }}
        component='Label'
      />,
    ));

    expect(component.UNSAFE_queryAllByType(Text).length).toEqual(1);
    expect(component.getByTestId('label').props.style[0]).toEqual(expect.objectContaining({ fontFamily: expect.any(String) }));
  });

  it('should keep the styled Text when a text variant prop is given', () => {
    const component = render(wrap(
      <FalsyText
        style={completeStyle}
        category='h1'
        component='Label'
      />,
    ));

    expect(component.UNSAFE_queryAllByType(Text).length).toEqual(1);
  });

  it('should render function and element components as before', () => {
    const Custom = (): React.ReactElement => <RNText>custom</RNText>;
    const fn = render(wrap(<FalsyText style={completeStyle} component={Custom} />));
    expect(fn.getByText('custom')).toBeTruthy();

    const el = render(wrap(<FalsyText style={completeStyle} component={<RNText style={{ opacity: 1 }}>element</RNText>} />));
    expect(el.getByText('element').props.style).toEqual([completeStyle, { opacity: 1 }]);
  });
});
