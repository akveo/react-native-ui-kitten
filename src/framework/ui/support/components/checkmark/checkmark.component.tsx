import React from 'react';
import {
  Image,
  ImageProps,
  ImageRequireSource,
} from 'react-native';

interface ComponentProps {
  indeterminate: boolean;
}

export type CheckMarkProps = Omit<ImageProps, 'source'> & ComponentProps;
export type CheckMarkElement = React.ReactElement<CheckMarkProps>;

export class CheckMark extends React.Component<CheckMarkProps> {

  static defaultProps: Partial<CheckMarkProps> = {
    indeterminate: false,
  };

  private getIconSource = (indeterminate: boolean): ImageRequireSource => {
    if (indeterminate) {
      return require('../../../../assets/checkmark-indeterminate.png');
    } else {
      return require('../../../../assets/checkmark.png');
    }
  };

  public render(): React.ReactElement<ImageProps> {
    const { indeterminate, ...imageProps } = this.props;

    return (
      <Image
        source={this.getIconSource(indeterminate)}
        {...imageProps}
      />
    );
  }
}
