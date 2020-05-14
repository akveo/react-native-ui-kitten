export interface WebEventResponderCallbacks {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class WebEventResponderInstance {
  readonly eventHandlers: WebEventResponderCallbacks;

  constructor(props: WebEventResponderCallbacks) {
    this.eventHandlers = props;
  }
}

class WebEventResponderStatic {
  static create(config: WebEventResponderCallbacks): WebEventResponderInstance {
    return new WebEventResponderInstance({
      onMouseEnter: () => {
        config.onMouseEnter && config.onMouseEnter();
      },
      onMouseLeave: () => {
        config.onMouseLeave && config.onMouseLeave();
      },
      onFocus: () => {
        config.onFocus && config.onFocus();
      },
      onBlur: () => {
        config.onBlur && config.onBlur();
      },
    });
  }
}

export const WebEventResponder = WebEventResponderStatic;
