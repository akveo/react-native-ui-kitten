import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewProps,
  Text,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TopNavigationBarProps {
  appearance?: string;
  title: string;
  subtitle?: string;
  leftControl?: React.ReactElement<any>;
  rightControls?: React.ReactElement<any>[];
  onLeftControl?: () => void;
  onRightControls?: (() => void)[];
}

export type Props = TopNavigationBarProps & StyledComponentProps & ViewProps;

export class TopNavigationBar extends React.Component<Props> {

  private hasSubtitle(mappingPermission: boolean): boolean {
    return mappingPermission && this.props.subtitle && this.props.subtitle.length !== 0;
  }

  public onLeftControl = (): void => {
    this.props.onLeftControl && this.props.onLeftControl();
  };

  private getLeftControlComponent(style: StyleType): React.ReactElement<any> | null {
    const leftControl: React.ReactElement<any> = this.props.leftControl ?
      React.cloneElement(this.props.leftControl, {
        style: { ...this.props.leftControl.props.style, ...style },
      }) : null;
    return this.props.leftControl ? (
      <TouchableOpacity testID='@top-navbar-left' onPress={this.onLeftControl}>
        {leftControl}
      </TouchableOpacity>
    ) : null;
  }

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      withSubtitle: style.withSubtitle,
      container: {
        backgroundColor: style.backgroundColor,
        height: style.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        paddingHorizontal: style.paddingHorizontal,
      },
      titleContainer: style.titleCentered ? {
        flex: 3,
        alignItems: 'center',
      } : {
        flex: 1,
        paddingHorizontal: 16,
      },
      leftControlContainer: style.titleCentered ? {
        flex: 1,
      } : null,
      rightControlsContainer: style.titleCentered ? {
        flex: 1,
      } : null,
      title: {
        color: style.titleColor,
        fontSize: style.titleFontSize,
        fontWeight: style.titleFontWeight,
      },
      subtitle: {
        color: style.subtitleColor,
        fontSize: style.subtitleFontSize,
        fontWeight: style.subtitleFontWeight,
      },
      leftControl: {
        backgroundColor: style.leftControlColor,
      },
      rightControlsColors: style.rightControlsColors,
    };
  };

  private getRightControl(control: React.ReactElement<any>,
                          index: number,
                          controlsColors: StyleType[]): React.ReactElement<any> {

    const additionalStyle: StyleType = index !== this.props.rightControls.length - 1 ?
      { marginRight: 5 } : null;
    const controlElement: React.ReactElement<any> = React.cloneElement(control, {
      style: {
        ...control.props.style,
        backgroundColor: controlsColors[index],
        ...additionalStyle,
      },
    });
    return (
      <TouchableOpacity
        onPress={this.props.onRightControls[index]}
        key={index}
        testID={`@top-navbar-right-${index}`}
      >
        {controlElement}
      </TouchableOpacity>
    );
  }

  private renderRightControls(controlsColors: StyleType[]): React.ReactElement<any>[] {
    return this.props.rightControls && this.props.rightControls
      .map((control: React.ReactElement<any>, i: number) =>
        this.getRightControl(control, i, controlsColors));
  }

  public render(): React.ReactNode {
    const componentStyles: StyleType = this.getComponentStyle(this.props.themedStyle);
    const leftControl: React.ReactElement<any> =
      this.getLeftControlComponent(componentStyles.leftControl);
    return (
      <View
        {...this.props}
        style={[styles.container, componentStyles.container, this.props.style]}
      >
        <View style={[componentStyles.leftControlContainer, styles.leftControlContainer]}>
          {leftControl}
        </View>
        <View style={componentStyles.titleContainer}>
          <Text style={componentStyles.title}>{this.props.title}</Text>
          {this.hasSubtitle(componentStyles.withSubtitle) &&
          <Text style={componentStyles.subtitle}>{this.props.subtitle}</Text>}
        </View>
        <View style={[styles.rightControlsContainer, componentStyles.rightControlsContainer]}>
          {this.renderRightControls(componentStyles.rightControlsColors)}
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
