import React from 'react';
import { View } from 'react-native';
import { RkText } from '../text/rkText';
import { RkComponent } from '../rkComponent';

export class RkOption extends RkComponent {
  componentName = 'RkOption';

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.optionRkType = this.props.optionRkType || 'subtitle large';
    this.selectedOptionRkType = this.props.selectedOptionRkType || 'header xlarge';
  }

  compareOptions(option1, option2) {
    return (option1.key && option2.key && option1.key === option2.key)
      || (!option1.key && !option2.key && option1 === option2);
  }

  render() {
    const isSelected = this.compareOptions(this.props.data, this.props.selectedOption);
    const rkType = isSelected ? this.selectedOptionRkType : this.optionRkType;
    const styles = [this.props.style, { height: this.optionHeight }];
    if (isSelected) {
      styles.push(this.props.selectedStyle);
    }
    return (
      <View style={styles}>
        <RkText rkType={rkType}>
          {this.props.data.value || this.props.data}
        </RkText>
      </View>
    );
  }
}
