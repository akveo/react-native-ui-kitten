// With only named React imports there is no `React` to qualify with, so `ComponentRef` is imported.
import { useRef } from 'react';
import { Button } from '@ui-kitten/components';

export const buttonRef = useRef<Button>(null);
