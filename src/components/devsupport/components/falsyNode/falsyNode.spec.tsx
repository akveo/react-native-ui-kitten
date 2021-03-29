import React from "react";
import { Text } from "react-native";
import { fireEvent, render } from "react-native-testing-library";
import { FalsyNode } from "./falsyNode.component";

it("should render nothing", function () {
  const component = render(<FalsyNode />);
  expect(component.toJSON()).toEqual(null);
});

it("should render provided React Element", () => {
  const component = render(
    <FalsyNode style={{ color: "red" }} component={<Text>I love Babel</Text>} />
  );

  const textComponent = component.getByText("I love Babel");

  expect(textComponent).toBeTruthy();
  expect(textComponent.props.style).toEqual({
    color: "red",
  });
});

it("should render provided React Element with overwritten styles", () => {
  const renderComponent = <Text style={{ color: "blue" }}>I love Babel</Text>;

  const component = render(
    <FalsyNode
      style={{ color: "red", backgroundColor: "black" }}
      component={renderComponent}
    />
  );

  const textComponent = component.getByText("I love Babel");

  expect(textComponent).toBeTruthy();
  expect(textComponent.props.style).toEqual({
    color: "blue",
    backgroundColor: "black",
  });
});

it('should keep props passed in FalsyNode component', function () {
  const onPress = jest.fn();

  const component = render(
    <FalsyNode
      onPress={onPress}
      component={<Text>I love Babel</Text>}
    />,
  );

  fireEvent.press(component.queryByText('I love Babel'));
  expect(onPress).toBeCalledTimes(1);
});

it('should override props passed in FalsyNode component', function () {
  const onPress = jest.fn();
  const onInnerPress = jest.fn();

  const component = render(
    <FalsyNode
      onPress={onPress}
      component={<Text onPress={onInnerPress}>I love Babel</Text>}
    />,
  );

  fireEvent.press(component.queryByText('I love Babel'));
  expect(onPress).toBeCalledTimes(0);
  expect(onInnerPress).toBeCalledTimes(1);
});
