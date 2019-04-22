export interface ButtonIconAlignment {
  rawValue: string;

  flex(): FlexAlignment;
}

export type FlexAlignment = 'row' | 'row-reverse';

export class ButtonIconAlignments {
  static LEFT: ButtonIconAlignment = new class implements ButtonIconAlignment {
    rawValue: string = 'left';

    flex(): FlexAlignment {
      return 'row';
    }
  };

  static RIGHT: ButtonIconAlignment = new class implements ButtonIconAlignment {
    rawValue: string = 'right';

    flex(): FlexAlignment {
      return 'row-reverse';
    }
  };

  static parse(value: string | ButtonIconAlignment, fallback?: ButtonIconAlignment): ButtonIconAlignment | undefined {
    if (ButtonIconAlignments.typeOf(value)) {
      return value;
    }

    return ButtonIconAlignments.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: ButtonIconAlignment): ButtonIconAlignment | undefined {
    switch (rawValue) {
      case ButtonIconAlignments.LEFT.rawValue:
        return ButtonIconAlignments.LEFT;
      case ButtonIconAlignments.RIGHT.rawValue:
        return ButtonIconAlignments.RIGHT;
      default:
        return fallback;
    }
  }

  private static typeOf(value: any): value is ButtonIconAlignment {
    const { rawValue } = (<ButtonIconAlignment>value);

    return rawValue !== undefined;
  }
}
