import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Props as TextProps,
  Text as TextComponent,
} from '../text/text.component';
import { CheckMark } from '../drawable';

interface CheckBoxProps {
  text?: string;
  checked?: boolean;
  indeterminate?: boolean;
  status?: string;
  size?: string;
  onChange?: (checked: boolean) => void;
}

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

  private onPress = () => {
    const { onChange, indeterminate } = this.props;

    if (indeterminate && onChange) {
      this.props.onChange(false);
    } else if (!indeterminate && onChange) {
      this.props.onChange(!this.props.checked);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getSelectSize = (indeterminate: boolean, width: number, height: number): StyleType => {
    if (indeterminate) {
      return {
        width: width - width * 0.18,
        height: height * 0.18,
      };
    } else {
      return {
        width: width * 0.5,
        height: height * 0.5,
      };
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      checkMarkColor,
      highlightWidth,
      highlightHeight,
      highlightBorderRadius,
      highlightBackgroundColor,
      ...containerParameters
    } = style;
    const { indeterminate } = this.props;

    return {
      selectContainer: containerParameters,
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
      },
      select: {
        ...this.getSelectSize(indeterminate, containerParameters.width, containerParameters.height),
        backgroundColor: checkMarkColor,
      },
      highlight: {
        width: highlightWidth,
        height: highlightHeight,
        borderRadius: highlightBorderRadius,
        backgroundColor: highlightBackgroundColor,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text style={[style, styles.text]} key={0}>{text}</Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { text } = this.props;

    return [
      text ? this.renderTextElement(style.text) : undefined,
    ];
  };

  private renderSelectIcon = (style: StyleType): React.ReactNode => {
    return <CheckMark style={[style, styles.select]}/>;
  };

  private renderIndeterminateIcon = (style: StyleType): React.ReactNode => {
    return <View style={[style, styles.indeterminate]}/>;
  };

  private renderIcon = (style: StyleType): React.ReactNode => {
    if (this.props.indeterminate) {
      return this.renderIndeterminateIcon(style);
    } else {
      return this.renderSelectIcon(style);
    }
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { selectContainer, select, highlight, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);
    const icon: React.ReactNode = this.renderIcon(select);

    return (
      <View style={[style, styles.container]}>
        <View style={styles.highlightContainer}>
          <View style={[highlight, styles.highlight]}/>
          <TouchableOpacity
            {...derivedProps}
            style={[selectContainer, styles.selectContainer]}
            activeOpacity={1.0}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            {icon}
          </TouchableOpacity>
        </View>
        {componentChildren}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {},
  indeterminate: {
    borderRadius: 6,
  },
  highlight: {
    position: 'absolute',
  },
  text: {
    marginLeft: 12,
  },
});
