/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { CompressedOperationsData } from '../compressor.js';
import type { ProtobufDescriptor } from '../protobuffactory.js';
import type { Operation } from 'ckeditor5/src/engine.js';
/**
 * Compresses and decompresses single operation to the binary format.
 */
export default class OperationCompressor {
    constructor(id: number, operationName: string, protobufDescriptor: ProtobufDescriptor);
    /**
     * Serializes and consumes the first operation from the list.
     *
     * @param result Object to which compression result will be added.
     * @param operations List of operations to compress. The first one will be compressed
     * and removed from the list.
     */
    compress(result: CompressedOperationsData, operations: Array<Operation>): boolean;
    /**
     * Deserializes and consumes buffered operation.
     *
     * @param result Decompressed operation.
     * @param data Data to decompress.
     */
    decompress(result: Array<Operation>, data: CompressedOperationsData): void;
}
