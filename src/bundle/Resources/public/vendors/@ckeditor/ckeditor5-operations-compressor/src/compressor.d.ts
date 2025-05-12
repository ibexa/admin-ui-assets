/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * Compresses and decompresses given set of operations in JSON format to/from the binary format using `Protocol Buffers`.
 */
export default class Compressor {
    constructor();
    /**
     * Compress given list of operations in JSON format.
     *
     * **Note** It tries to combine typing-like or deleting-like operations into the one buffer.
     * **Note** Input data will be consumed and modified during compression process. If you need untouched data
     * you need to copy it before the compression.
     */
    compress(operations: Array<any>): CompressedOperationsData;
    /**
     * Decompress given data to the list of operations in JSON format.
     *
     * **Note** Input data will be consumed during decompression process. If you need untouched data
     * you need to copy it before the decompression.
     *
     * @param data Compressed operations.
     * @returns List of operations in JSON format.
     */
    decompress(data: CompressedOperationsData): Array<any>;
}
/**
 * Compressed operations data.
 */
export type CompressedOperationsData = {
    /**
     * List of operations compressed to the binary format.
     */
    buffers: Array<Uint8Array>;
    /**
     * List of compressor identifiers. According to this types a proper compressor will be used for the decompression.
     */
    types: Array<number>;
    /**
     * Base version of the first compressed operation.
     */
    baseVersion: number;
};
