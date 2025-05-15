/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import MarkerOperationCompressor from './markeroperationcompressor.js';
import type { ProtobufDescriptor } from '../protobuffactory.js';
import type { CompressedOperationsData } from '../compressor.js';
import type { MarkerOperation } from 'ckeditor5/src/engine.js';
export default class AnnotationMarkerOperationCompressor extends MarkerOperationCompressor {
    /**
     * @inheritDoc
     */
    constructor(id: number, name: string, descriptor: ProtobufDescriptor, namespaceToOmit: string);
    /**
     * @inheritDoc
     */
    compress(result: CompressedOperationsData, operations: Array<MarkerOperation>): boolean;
    /**
     * @inheritDoc
     */
    decompress(result: Array<MarkerOperation>, data: CompressedOperationsData): void;
}
