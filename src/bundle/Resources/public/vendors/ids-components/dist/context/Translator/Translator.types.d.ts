import { ReactNode } from 'react';
export type TranslatorFunction = (translationKey: string, parameters?: Record<string, string>) => string;
export interface TranslatorType {
    trans: TranslatorFunction;
}
export interface TranslatorProps {
    children: ReactNode;
    value: TranslatorType;
}
