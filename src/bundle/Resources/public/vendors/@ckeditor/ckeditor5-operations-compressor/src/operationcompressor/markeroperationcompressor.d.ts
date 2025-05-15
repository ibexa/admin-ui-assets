/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import OperationCompressor from './operationcompressor.js';
import type { CompressedOperationsData } from '../compressor.js';
import type { MarkerOperation } from 'ckeditor5/src/engine.js';
export default class MarkerOperationCompressor extends OperationCompressor {
    /**
     * @inheritDoc
     */
    decompress(result: Array<MarkerOperation>, data: CompressedOperationsData): void;
}
