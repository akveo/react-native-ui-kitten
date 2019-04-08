export interface TopNavigationAlignment {
  rawValue: string;

  margin(leftActionCount: number, rightActionCount: number, actionWidth: number): number;
}

export class TopNavigationAlignments {
  static START: TopNavigationAlignment = new class implements TopNavigationAlignment {
    rawValue: string = 'start';

    margin(leftActionCount: number, rightActionCount: number, actionWidth: number): number {
      return 0;
    }
  };

  static CENTER: TopNavigationAlignment = new class implements TopNavigationAlignment {
    rawValue: string = 'center';

    margin(leftActionCount: number, rightActionCount: number, actionWidth: number): number {
      const diff: number = rightActionCount - leftActionCount;

      return (rightActionCount - leftActionCount) * diff;
    }
  };

  static parse(value: string | TopNavigationAlignment,
               fallback?: TopNavigationAlignment): TopNavigationAlignment | undefined {

    if (TopNavigationAlignments.typeOf(value)) {
      return value;
    }

    return TopNavigationAlignments.parseString(value, fallback);
  }

  private static parseString(rawValue: string,
                             fallback?: TopNavigationAlignment): TopNavigationAlignment | undefined {

    switch (rawValue) {
      case TopNavigationAlignments.START.rawValue:
        return TopNavigationAlignments.START;
      case TopNavigationAlignments.CENTER.rawValue:
        return TopNavigationAlignments.CENTER;
      default:
        return fallback;
    }
  }

  private static typeOf(value: any): value is TopNavigationAlignment {
    const { rawValue } = (<TopNavigationAlignment>value);

    return rawValue !== undefined;
  }
}
