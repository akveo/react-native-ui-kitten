import React from 'react';
import {
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  ButtonGroup,
  ButtonGroupProps,
} from './buttonGroup.component';
import { Button } from '../button/button.component';
import {
  mapping,
  theme,
} from '../support/tests';

const Mock = (props?: ButtonGroupProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <ButtonGroup {...props} />
    </ApplicationProvider>
  );
};

describe('@button-group: component checks', () => {

  it('* children styled properly (appearance)', () => {
    const groupAppearance: string = 'outline';

    const component: RenderAPI = render(
      <Mock appearance={groupAppearance}>
        <Button appearance='default'/>
        <Button/>
        <Button appearance='outline'/>
      </Mock>,
    );

    const children: ReactTestInstance[] = component.getAllByType(Button);
    const childrenSize: string = children.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.appearance;
    }, groupAppearance);

    expect(childrenSize).toEqual(groupAppearance);
  });

  it('* children styled properly (size)', () => {
    const groupSize: string = 'giant';

    const component: RenderAPI = render(
      <Mock size={groupSize}>
        <Button size='large'/>
        <Button/>
        <Button size='small'/>
        <Button size='tiny'/>
      </Mock>,
    );

    const children: ReactTestInstance[] = component.getAllByType(Button);
    const childrenSize: string = children.reduce((current: string, child: ReactTestInstance): string => {
      return child.props.size;
    }, groupSize);

    expect(childrenSize).toEqual(groupSize);
  });

});
