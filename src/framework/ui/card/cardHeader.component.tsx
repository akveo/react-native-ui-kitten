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
  accentStyle?: StyleProp<ViewStyle>;
}

export type CardHeaderProps = Partial<ListItemProps> & ViewProps & ComponentProps;
export type CardHeaderComponentElement = React.ReactElement<CardHeaderProps>;

/**
 * Styled `CardHeader` component can be used like `header` in the `Card` component.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the component.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {StyleProp<ViewStyle>} accentStyle - Determines style of the stripe element.
 *
 * @property ViewProps
 *
 * @overview-example ButtonSimpleUsage
 *
 * @overview-example ButtonAppearances
 */

export class CardHeader extends React.Component<CardHeaderProps> {

  public render(): CardHeaderComponentElement {
    const { accentStyle, ...restProps } = this.props;

    return (
      <React.Fragment>
        <View style={accentStyle}/>
        <ListItem{...restProps} />
      </React.Fragment>
    );
  }
}
