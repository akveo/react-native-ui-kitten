import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface TouchableWithoutFeedbackProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

/**
 * Helper component for the Touchable component with no opacity feedback.
 *
 * - Why?
 * - Allows passing ReactNode as children whereas original TouchableWithoutFeedback not.
 *
 * Renders TouchableOpacity with `activeOpacity` set to 1 by default.
 */
export class TouchableWithoutFeedback extends React.Component<TouchableWithoutFeedbackProps> {

  public render(): React.ReactElement {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...this.props}
      />
    );
  }
}
