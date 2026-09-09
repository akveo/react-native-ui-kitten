// `@eva-design/dss` had zero runtime exports — its index body is only the `__esModule` marker — and
// `@ui-kitten/processor` re-exports the same 19 names from byte-identical sources.
import { ThemeStyleType, SchemaType } from '@eva-design/dss';
import type { CustomSchemaType } from '@eva-design/dss';

export type Styles = ThemeStyleType;
export type Schema = SchemaType;
export type Custom = CustomSchemaType;
