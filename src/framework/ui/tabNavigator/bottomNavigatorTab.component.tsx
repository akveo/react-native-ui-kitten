import React from 'react';
import {
  View,
  ViewProps,
  Text,
  StyleSheet,
  ImageSourcePropType,
  TextProps,
  ImageProps,
  Image,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface BottomNavigatorTabProps {
  appearance?: string;
  title?: string;
  isSelected?: boolean;
  getIconSource?: (isSelected: boolean) => ImageSourcePropType;
}

export type Props = BottomNavigatorTabProps & StyledComponentProps & ViewProps;

export class BottomNavigatorTab extends React.Component<Props> {

  private hasText(): boolean {
    return this.props.title && this.props.title.length !== 0;
  }

  private getComponentStyle = (source: StyleType): StyleType => ({
    icon: {
      width: source['icon.width'],
      height: source['icon.height'],
      marginBottom: source['icon.marginBottom'],
    },
    title: {
      color: this.props.isSelected ? source['title.selectedColor'] : source['title.color'],
    },
  });

  private renderTitle(style: StyleType): React.ReactElement<TextProps> | null {
    return this.hasText() ? <Text style={style}>{this.props.title}</Text> : null;
  }

  private renderIcon(style: StyleType): React.ReactElement<ImageProps> | null {
    return this.props.getIconSource ?
      <Image style={style} source={this.props.getIconSource(this.props.isSelected)}/> : null;
  }

  public render(): React.ReactNode {
    const componentStyle = this.getComponentStyle(this.props.themedStyle);

    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        {this.renderIcon(componentStyle.icon)}
        {this.renderTitle(componentStyle.title)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
