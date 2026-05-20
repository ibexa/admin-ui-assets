export type TranslatorFunction = (translationKey: string, parameters?: Record<string, string>) => string;
export interface TranslatorType {
    trans: TranslatorFunction;
}
