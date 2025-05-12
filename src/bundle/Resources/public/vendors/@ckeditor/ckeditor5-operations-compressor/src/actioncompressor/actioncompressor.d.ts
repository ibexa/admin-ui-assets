/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { CompressedOperationsData, default as Compressor } from '../compressor.js';
/**
 * * Compresses and decompresses multiple operations into the one buffer.
 */
export default abstract class ActionCompressor {
    constructor(id: number, context: Compressor);
    /**
     * Combines and compress operations from the list.
     * Operations are consumed as long as match this compressor.
     *
     * @param result Object to which compression result should be added.
     * @param operations List of operations in JSON format to compress.
     * @returns `true` when operation is consumed `false` otherwise.
     */
    compress(result: CompressedOperationsData, operations: Array<any>): boolean;
    /**
     * Decompress and split compressed operations. Decompressed operations are consumed (removed from the input data).
     *
     * @param result Decompressed operations in JSON format.
     * @param data Compressed operations data.
     */
    decompress(result: Array<any>, data: CompressedOperationsData): void;
    /**
     * Compresses single operation using a proper compressor.
     *
     * @param operation Operation in JSON format.
     * @returns Operation JSON compressed to the binary format.
     */
    protected abstract _compressSingleOperation(operation: any): Uint8Array;
    /**
     * Decompresses combined operation using a proper compressor.
     *
     * @param data Data to compress.
     * @returns Decompressed operation in JSON format.
     */
    protected abstract _decompressSingleOperation(data: CompressedOperationsData): any;
    /**
     * Combine next operation into the combined one.
     *
     * @param nextOperation Operation to combine in JSON format.
     * @param combined Combined operation in JSON format.
     * @returns Combined operation in JSON format.
     */
    protected abstract _combineNext(nextOperation: any, combined: any): any;
    /**
     * Split operation from combined one.
     *
     * @param combined Combined operation in JSON format.
     * @returns Split operation in JSON format.
     */
    protected abstract _splitCurrent(combined: any): any;
    /**
     * Checks if two operations can be combined.
     */
    protected abstract _compareOperations(opA: any, opB: any): boolean;
}
