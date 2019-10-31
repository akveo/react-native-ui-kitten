import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ListItem } from '../list/listItem.component';

interface ComponentProps {
  title: string;
  description?: string;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  accentStyle?: StyleProp<ViewStyle>;
}

export type CardHeaderProps = ViewProps & ComponentProps;
export type CardHeaderElement = React.ReactElement<CardHeaderProps>;

/**
 * Styled `CardHeader` component can be used like `header` in the `Card` component.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the ListItem.
 *
 * @property {string} description - Determines the description of the ListItem's title.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {StyleProp<TextStyle>} descriptionStyle - Customizes description style.
 *
 * @property {StyleProp<ViewStyle>} accentStyle - Determines style of the stripe element.
 *
 * @property {StyleProp<ViewStyle>} headerStyle - Determines style of the header container element.
 *
 * @property {ViewProps} - Any props applied to View component.
 */

export class CardHeader extends React.Component<CardHeaderProps> {

  public render(): React.ReactFragment {
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
