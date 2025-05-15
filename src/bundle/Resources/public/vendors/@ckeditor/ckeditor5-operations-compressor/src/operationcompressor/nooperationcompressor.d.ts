/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import OperationCompressor from './operationcompressor.js';
import type { CompressedOperationsData } from '../compressor.js';
import type { Operation } from 'ckeditor5/src/engine.js';
/**
 * @extends OperationCompressor
 */
export default class NoOperationCompressor extends OperationCompressor {
    /**
     * @inheritDoc
     */
    compress(result: CompressedOperationsData, operations: Array<Operation>): boolean;
    /**
     * @inheritDoc
     */
    decompress(result: Array<any>, data: CompressedOperationsData): void;
}
