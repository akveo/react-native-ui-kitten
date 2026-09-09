// `@eva-design/dss` had zero runtime exports — its index body is only the `__esModule` marker — and
// `@ui-kitten/processor` re-exports the same 19 names from byte-identical sources.
import type { ThemeStyleType, SchemaType } from '@ui-kitten/processor';
import type { CustomSchemaType } from '@ui-kitten/processor';

export type Styles = ThemeStyleType;
export type Schema = SchemaType;
export type Custom = CustomSchemaType;
