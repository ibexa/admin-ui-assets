/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import ActionCompressor from './actioncompressor.js';
import type { CompressedOperationsData } from '../compressor.js';
export default class UserSelectionActionCompressor extends ActionCompressor {
    /**
     * @inheritDoc
     */
    compress(result: CompressedOperationsData, operations: Array<any>): boolean;
    /**
     * @inheritDoc
     */
    decompress(result: Array<any>, data: CompressedOperationsData): void;
}
