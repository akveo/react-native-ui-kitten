import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';

export class DoubleTouchableWithoutFeedback extends React.Component {
  static propTypes = {
    onSinglePress: PropTypes.func.isRequired,
    onDoublePress: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };
  static defaultProps = {
    delay: 300,
  };

  constructor(props) {
    super(props);
    this.delayFlag = false;
    this.eventCounter = 0;
  }

  handlePressEvent = (event) => {
    if (this.eventCounter === 2) {
      this.props.onDoublePress(event);
    }
    if (this.eventCounter === 1) {
      this.props.onSinglePress(event);
    }
    this.eventCounter = 0;
    this.delayFlag = false;
  };

  onPress = (event) => {
    this.delayFlag = true;
    this.eventCounter += 1;
    setTimeout(() => this.handlePressEvent(event), this.props.delay);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.delayFlag ? () => {} : this.onPress}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}
