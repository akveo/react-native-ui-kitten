export interface ButtonAlignment {
  rawValue: string;

  flex(): FlexAlignment;
}

export type FlexAlignment = 'row' | 'row-reverse';

export class ButtonAlignments {
  static LEFT: ButtonAlignment = new class implements ButtonAlignment {
    rawValue: string = 'left';

    flex(): FlexAlignment {
      return 'row';
    }
  };

  static RIGHT: ButtonAlignment = new class implements ButtonAlignment {
    rawValue: string = 'right';

    flex(): FlexAlignment {
      return 'row-reverse';
    }
  };

  static parse(value: string | ButtonAlignment, fallback?: ButtonAlignment): ButtonAlignment | undefined {
    if (ButtonAlignments.typeOf(value)) {
      return value;
    }

    return ButtonAlignments.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: ButtonAlignment): ButtonAlignment | undefined {
    switch (rawValue) {
      case ButtonAlignments.LEFT.rawValue:
        return ButtonAlignments.LEFT;
      case ButtonAlignments.RIGHT.rawValue:
        return ButtonAlignments.RIGHT;
      default:
        return fallback;
    }
  }

  private static typeOf(value: any): value is ButtonAlignment {
    const { rawValue } = (<ButtonAlignment>value);

    return rawValue !== undefined;
  }
}
