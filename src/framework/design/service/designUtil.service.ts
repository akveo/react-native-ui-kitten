import {
  DesignType,
  MappingType,
} from '../component';

/**
 * @param component: string - component name. Using displayName is recommended
 * @param design: DesignType[] - design configuration array
 *
 * @return DesignType if presents in design, undefined otherwise
 */
export function getComponentDesign(component: string, design: DesignType[]): DesignType {
  return design.find(value => value.name === component);
}

/**
 * @param design: DesignType - component design configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return MappingType if presents in design, undefined otherwise
 */
export function getComponentMapping(design: DesignType, variant: string = 'default'): MappingType[] {
  return design.variants.find(value => value.name === variant).mapping;
}
