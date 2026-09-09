// The ref type is added under its real name, not aliased to match the component.
// The alias existed to dodge a clash on `Input`; `InputRef` does not share that clash.
import React from 'react';
import { Input as UIInput, Select as UISelect } from '@ui-kitten/components';

export const ref = React.useRef<UIInput>(null);
export const other: React.Ref<UISelect> = null;

export const Field = (): React.ReactElement => <UIInput ref={ref} />;
