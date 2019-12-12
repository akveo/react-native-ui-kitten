import {
  AccessibilityProps,
  AccessibilityRole,
  AccessibilityState,
} from 'react-native';

export const getDefaultAccessibilityProps =
  <P extends Partial<AccessibilityState>>(accessibilityRole: AccessibilityRole,
                                          accessibilityLabel: string,
                                          props?: P,
                                          otherProps?: AccessibilityProps): Partial<AccessibilityProps> => {

  const { disabled, selected, checked, expanded } = props;

  return {
    accessible: true,
    accessibilityRole,
    accessibilityLabel,
    accessibilityState: { disabled, checked, expanded, selected },
    ...otherProps,
  };
};
