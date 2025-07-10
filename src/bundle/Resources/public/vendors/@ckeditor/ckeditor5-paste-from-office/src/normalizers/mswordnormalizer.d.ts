/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type ViewDocument } from 'ckeditor5/src/engine.js';
import type { Normalizer, NormalizerData } from '../normalizer.js';
/**
 * Normalizer for the content pasted from Microsoft Word.
 */
export default class MSWordNormalizer implements Normalizer {
    readonly document: ViewDocument;
    readonly hasMultiLevelListPlugin: boolean;
    /**
     * Creates a new `MSWordNormalizer` instance.
     *
     * @param document View document.
     */
    constructor(document: ViewDocument, hasMultiLevelListPlugin?: boolean);
    /**
     * @inheritDoc
     */
    isActive(htmlString: string): boolean;
    /**
     * @inheritDoc
     */
    execute(data: NormalizerData): void;
}
