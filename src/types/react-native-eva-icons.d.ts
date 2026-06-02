declare module 'react-native-eva-icons' {
  import { SvgProps } from 'react-native-svg';

  export interface EvaIcon {
    name: string;
    toSvg: (props?: SvgProps) => JSX.Element;
  }

  export function findIconByName(name: string): EvaIcon;
}
