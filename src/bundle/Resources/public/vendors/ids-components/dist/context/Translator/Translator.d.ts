import React from 'react';
import { TranslatorProps, TranslatorType } from './Translator.types';
export declare const TranslatorContext: React.Context<TranslatorType>;
declare const TranslatorProvider: ({ children, value }: TranslatorProps) => React.JSX.Element;
export default TranslatorProvider;
