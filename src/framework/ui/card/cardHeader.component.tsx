import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import {
  ListItem,
  TemplateTitleProps,
  TemplateDescriptionProps,
} from '../list/listItem.component';

interface ComponentProps {
  headerStyle?: StyleProp<ViewStyle>;
  accentStyle?: StyleProp<ViewStyle>;
}

type ListItemProps = TemplateTitleProps | TemplateDescriptionProps;
type ListItemLikeProps = Omit<ListItemProps, 'icon' | 'accessory' | keyof TouchableOpacityProps>;

export type CardHeaderProps = ListItemLikeProps & ViewProps & ComponentProps;
export type CardHeaderElement = React.ReactElement<CardHeaderProps>;

/**
 * Styled `CardHeader` component can be used like `header` in the `Card` component.
 *
 * @extends React.Component
 *
 * @property {StyleProp<ViewStyle>} accentStyle - Determines style of the stripe element.
 *
 * @property {StyleProp<ViewStyle>} accentStyle - Determines style of the header container element.
 *
 * @property {Omit<ListItemProps, 'icon' | 'accessory' | keyof TouchableOpacityProps>}
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
