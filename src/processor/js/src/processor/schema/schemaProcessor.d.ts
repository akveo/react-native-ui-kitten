import { Processor } from '../processor';
import { SchemaType, ThemeStyleType } from '@ui-kitten/processor/dss';
export declare class SchemaProcessor implements Processor<SchemaType, ThemeStyleType> {
    private mappingProcessor;
    private metaProcessor;
    process(params: SchemaType): ThemeStyleType;
}
