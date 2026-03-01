import { ThemeMappingType } from '@ui-kitten/processor/dss';
import { Processor } from '../processor';
export interface MappingMetaType {
    name: string;
    appearance: string;
    variants: string[];
    states: string[];
}
export declare class MappingProcessor implements Processor<ThemeMappingType, MappingMetaType[]> {
    process(params: ThemeMappingType): MappingMetaType[];
    private getComponentMappingMeta;
    private getComponentVariants;
    private getComponentStates;
    private concatComponentVariants;
    private concatVariantGroups;
    private concatComponentStates;
}
