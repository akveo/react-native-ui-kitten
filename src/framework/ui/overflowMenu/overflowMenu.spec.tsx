import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ApplicationProvider } from '@kitten/theme';
import {
  OverflowMenuItemType,
  OverflowMenu,
  OverflowMenuProps,
} from './overflowMenu.component';
import { Button } from '../button/button.component';
import {
  mapping,
  theme,
} from '../support/tests';

interface State {
  menuVisible: boolean;
  selectedIndex: number;
}

interface ComponentProps {
  onSelectChecker?: () => void;
}

type Props = ComponentProps & Partial<OverflowMenuProps>;

class TestApplication extends React.Component<Props, State> {

  public state: State = {
    menuVisible: false,
    selectedIndex: null,
  };

  private setMenuVisible = (): void => {
    const menuVisible: boolean = !this.state.menuVisible;

    this.setState({ menuVisible });
  };

  private onSelect = (selectedIndex: number): void => {
    this.props.onSelectChecker && this.props.onSelectChecker();
    this.setState({ selectedIndex }, this.setMenuVisible);
  };

  public render(): React.ReactNode {
    const { data } = this.props;
    const { menuVisible, selectedIndex } = this.state;

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <OverflowMenu
          data={data}
          visible={menuVisible}
          selectedIndex={selectedIndex}
          onBackdropPress={this.setMenuVisible}
          onSelect={this.onSelect}>
          <Button onPress={this.setMenuVisible}>Show</Button>
        </OverflowMenu>
      </ApplicationProvider>
    );
  }
}

describe('@overflow-menu: component checks', () => {

  const defaultItems: OverflowMenuItemType[] = [
    { title: 'Option 1' },
    { title: 'Option 2' },
    { title: 'Option 3' },
  ];

  it('* menu-item visible prop check', () => {
    const application: RenderAPI = render(
      <TestApplication
        data={defaultItems}
      />,
    );

    fireEvent.press(application.getByType(Button));

    const { visible } = application.getByType(OverflowMenu).props;
    expect(visible).toBe(true);
  });

  it('* menu-item onSelect prop check', () => {
    const onSelectChecker = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        data={defaultItems}
        onSelectChecker={onSelectChecker}
      />,
    );

    fireEvent.press(application.getByType(Button));
    fireEvent.press(application.getAllByText('Option 1')[0]);

    expect(onSelectChecker).toHaveBeenCalled();
  });

  it('* menu-item onSelect/selectedIndex prop check', () => {
    const application: RenderAPI = render(
      <TestApplication
        data={defaultItems}
      />,
    );

    fireEvent.press(application.getByType(Button));
    fireEvent.press(application.getAllByText('Option 2')[0]);

    const { selectedIndex } = application.getByType(OverflowMenu).props;

    expect(selectedIndex).toBe(1);
  });

});
