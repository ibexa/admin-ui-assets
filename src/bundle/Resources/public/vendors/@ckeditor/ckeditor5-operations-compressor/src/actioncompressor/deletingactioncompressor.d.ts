/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import ActionCompressor from './actioncompressor.js';
import type { CompressedOperationsData } from '../compressor.js';
export default class DeletingActionCompressor extends ActionCompressor {
    /**
     * @inheritDoc
     */
    protected _combineNext(nextOperation: any, combined: any): any;
    /**
     * @inheritDoc
     */
    protected _splitCurrent(combined: any): any;
    /**
     * @inheritDoc
     */
    protected _compareOperations(opA: any, opB: any): boolean;
    /**
     * @inheritDoc
     */
    protected _compressSingleOperation(operation: any): Uint8Array;
    /**
     * @inheritDoc
     */
    protected _decompressSingleOperation(data: CompressedOperationsData): any;
}
