/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import OperationCompressor from './operationcompressor.js';
import type { CompressedOperationsData } from '../compressor.js';
import type { AttributeOperation } from 'ckeditor5/src/engine.js';
export default class AttributeOperationCompressor extends OperationCompressor {
    /**
     * @inheritDoc
     */
    compress(result: CompressedOperationsData, operations: Array<AttributeOperation>): boolean;
    /**
     * @inheritDoc
     */
    decompress(result: Array<AttributeOperation>, data: CompressedOperationsData): void;
}
