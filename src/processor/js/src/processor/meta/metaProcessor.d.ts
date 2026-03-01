import { ThemeStyleType, ThemeMappingType, StrictTheme } from '@ui-kitten/processor/dss';
import { MappingMetaType } from '../mapping/mappingProcessor';
import { Processor } from '../processor';
export interface MappingProcessorParamsType {
    mapping: ThemeMappingType;
    meta: MappingMetaType[];
    theme: StrictTheme;
}
export declare class MetaProcessor implements Processor<MappingProcessorParamsType, ThemeStyleType> {
    process(params: MappingProcessorParamsType): ThemeStyleType;
    private processStrictTheme;
    private getStrictThemeValue;
    private findValue;
    private isReference;
    private createKeyFromReference;
    private withControlMeta;
}
