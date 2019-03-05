import React from 'react';
import {
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  ButtonGroup as ButtonGroupComponent,
  Props as ButtonGroupProps,
} from './buttonGroup.component';
import {
  Button as ButtonComponent,
  Props as ButtonProps,
} from '../button/button.component';
import * as config from './buttonGroup.spec.config';

const Button = styled<ButtonComponent, ButtonProps>(ButtonComponent);
const ButtonGroup = styled<ButtonGroupComponent, ButtonGroupProps>(ButtonGroupComponent);

const Mock = (props?: ButtonGroupProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <ButtonGroup {...props} />
  </StyleProvider>
);

describe('@button-group: component checks', () => {

  it('* children styled properly (appearance)', () => {
    const groupAppearance: string = 'outline';

    const component: RenderAPI = render(
      <Mock appearance={groupAppearance}>
        <Button appearance='default'/>
        <Button/>
        <Button size='outline'/>
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
