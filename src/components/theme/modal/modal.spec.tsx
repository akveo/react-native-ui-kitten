import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { render } from 'react-native-testing-library';
import { ModalPanel } from './modalPanel.component';
import { ModalService } from './modal.service';

describe('@modal-panel: component checks', () => {

  it('should set service instance when becomes mounted', () => {
    render(
      <ModalPanel>Test</ModalPanel>,
    );

    expect(ModalService.panel).toBeTruthy();
  });

  it('should clean service instance when becomes unmounted', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    component.unmount();

    expect(ModalService.panel).toBeFalsy();
  });
});

describe('@modal-service: service checks', () => {

  it('should do nothing on show if there is no ModalPanel', () => {
    const component = render(
      <View/>,
    );

    const id = ModalService.show(<Text>I love Babel</Text>, {});
    const text = component.queryByText('I love Babel');

    expect(id).toBeFalsy();
    expect(text).toBeFalsy();
  });

  it('should do nothing on update if there is no ModalPanel', () => {
    const component = render(<View/>);

    ModalService.update('random-id', <Text>I love Babel</Text>);

    expect(component.queryByText('I love Babel')).toBeFalsy();
  });

  it('should do nothing on hide if there is no ModalPanel', () => {
    const component = render(
      <View/>,
    );

    const id = ModalService.show(<Text>I love Babel</Text>, {});

    expect(id).toBeFalsy();
    expect(component.queryByText('I love Babel')).toBeFalsy();

    const newId = ModalService.hide(id);

    expect(newId).toBeFalsy();
  });

  it('should render element and return it\'s id', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    const id = ModalService.show(<Text>I love Babel</Text>, {});
    const text = component.queryByText('I love Babel');

    expect(id).toBeTruthy();
    expect(text).toBeTruthy();
  });

  it('should render multiple elements with unique ids', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    const firstId = ModalService.show(<Text>I love Babel</Text>, {});
    const secondId = ModalService.show(<Text>I love Jest</Text>, {});

    const firstElement = component.queryByText('I love Babel');
    const secondElement = component.queryByText('I love Jest');

    expect(firstElement).toBeTruthy();
    expect(secondElement).toBeTruthy();
    expect(firstId).not.toEqual(secondId);
  });

  it('should update rendered element by it\'s id', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    const id = ModalService.show(<Text>I love Babel</Text>, {});
    ModalService.update(id, <Text>I love Jest</Text>);

    expect(component.queryByText('I love Babel')).toBeFalsy();
    expect(component.queryByText('I love Jest')).toBeTruthy();
  });

  it('should do nothing on update if there is no element with id', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    ModalService.show(<Text>I love Babel</Text>, {});
    ModalService.update('random-id', <Text>I love Jest</Text>);

    expect(component.queryByText('I love Babel')).toBeTruthy();
    expect(component.queryByText('I love Jest')).toBeFalsy();
  });

  it('should hide rendered element by it\'s id and clear it\'s id', () => {
    const component = render(
      <ModalPanel>Test</ModalPanel>,
    );

    const id = ModalService.show(<Text>I love Jest</Text>, {});

    expect(component.queryByText('I love Jest')).toBeTruthy();

    const newId = ModalService.hide(id);

    expect(component.queryByText('I love Jest')).toBeFalsy();
    expect(newId).toBeFalsy();
  });

});
