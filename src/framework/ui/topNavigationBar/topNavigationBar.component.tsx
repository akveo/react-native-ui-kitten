import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  TextProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as ActionProps } from './topNavigationBarAction.component';

interface TopNavigationBarProps {
  title?: string;
  subtitle?: string;
  leftControl?: React.ReactElement<ActionProps>;
  rightControls?: React.ReactElement<ActionProps>[];
}

export type Props = TopNavigationBarProps & StyledComponentProps & ViewProps;

export class TopNavigationBar extends React.Component<Props> {

  private getComponentStyle = (style: StyleType): StyleType => ({
    container: {
      backgroundColor: style.backgroundColor,
      height: style.height,
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      paddingHorizontal: style.paddingHorizontal,
    },
    titleContainer: style['title.centered'] ? {
      flex: 3,
      alignItems: 'center',
    } : {
      flex: 1,
      paddingHorizontal: style.paddingHorizontal,
    },
    leftControlContainer: style['title.centered'] ? {
      flex: 1,
    } : null,
    rightControlsContainer: style['title.centered'] ? {
      flex: 1,
    } : null,
    title: {
      color: style['title.color'],
      fontSize: style['title.fontSize'],
      fontWeight: style['title.fontWeight'],
    },
    subtitle: {
      color: style['subtitle.color'],
      fontSize: style['subtitle.fontSize'],
      fontWeight: style['subtitle.fontWeight'],
    },
  });

  private hasText(text: string): boolean {
    return text && text.length !== 0;
  }

  private renderText(text: string, style: StyleType): React.ReactElement<TextProps> | null {
    return this.hasText(text) ? <Text style={style}>{text}</Text> : null;
  }

  private renderRightControl(item: React.ReactElement<ActionProps>,
                             index: number): React.ReactElement<ActionProps> | null {

    return item ? React.cloneElement(item, {
      key: index,
      isLastItem: React.Children.count(this.props.rightControls) - 1 === index,
    }) : null;
  }

  private renderRightControls(): React.ReactElement<ActionProps>[] | null {
    return React.Children
      .map(this.props.rightControls, (item: React.ReactElement<ActionProps>, i: number) =>
        this.renderRightControl(item, i));
  }

  public render(): React.ReactNode {
    const componentStyles: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View
        {...this.props}
        style={[styles.container, componentStyles.container, this.props.style]}
      >
        <View style={[componentStyles.leftControlContainer, styles.leftControlContainer]}>
          {this.props.leftControl}
        </View>
        <View style={componentStyles.titleContainer}>
          {this.renderText(this.props.title, componentStyles.title)}
          {this.renderText(this.props.subtitle, componentStyles.subtitle)}
        </View>
        <View style={[styles.rightControlsContainer, componentStyles.rightControlsContainer]}>
          {this.renderRightControls()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftControlContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
