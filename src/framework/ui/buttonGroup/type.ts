import { StyleType } from '@kitten/theme';

export interface ButtonStyleProvider {
  start(source: StyleType): StyleType;

  center(source: StyleType): StyleType;

  end(source: StyleType): StyleType;
}

export class ButtonStyleProviders {
  static DEFAULT: ButtonStyleProvider = new class implements ButtonStyleProvider {

    defaults(source: StyleType): StyleType {
      return {
        borderRadius: 0,
      };
    }

    start(source: StyleType): StyleType {
      const { borderRadius, margin } = source;

      return {
        ...this.defaults(source),
        borderTopStartRadius: borderRadius,
        borderBottomStartRadius: borderRadius,
        marginRight: margin / 2,
      };
    }

    center(source: StyleType): StyleType {
      const { margin } = source;

      return {
        ...this.defaults(source),
        marginHorizontal: margin / 2,
      };
    }

    end(source: StyleType): StyleType {
      const { borderRadius, margin } = source;

      return {
        ...this.defaults(source),
        borderTopEndRadius: borderRadius,
        borderBottomEndRadius: borderRadius,
        marginLeft: margin / 2,
      };
    }
  };
}
