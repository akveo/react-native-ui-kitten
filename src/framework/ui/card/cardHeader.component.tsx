import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  ListItem,
  ListItemProps,
} from '../list/listItem.component';

interface ComponentProps {
  headerStyle?: StyleProp<ViewStyle>;
  accentStyle?: StyleProp<ViewStyle>;
}

export type CardHeaderProps = Partial<ListItemProps> & ViewProps & ComponentProps;
export type CardHeaderElement = React.ReactElement<CardHeaderProps>;

/**
 * Styled `CardHeader` component can be used like `header` in the `Card` component.
 *
 * @extends React.Component
 *
 * @property {StyleProp<ViewStyle>} accentStyle - Determines style of the stripe element.
 *
 * @property {Partial<ListItemProps>}
 *
 * @property ViewProps - Any props applied to View component.
 */

export class CardHeader extends React.Component<CardHeaderProps> {

  public render(): CardHeaderComponentElement {
    const { accentStyle, style, headerStyle, ...restProps } = this.props;

    return (
      <React.Fragment>
        <View style={accentStyle}/>
        <ListItem
          style={[style, headerStyle]}
          {...restProps}
        />
      </React.Fragment>
    );
  }
}
