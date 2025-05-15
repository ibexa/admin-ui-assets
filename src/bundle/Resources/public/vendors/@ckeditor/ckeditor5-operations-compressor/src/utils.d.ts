/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * Return new position in JSON format shifted by given offset.
 *
 * @param positionJSON Position serialized to JSON.
 * @param shift Offset shift. Can be a negative value.
 * @returns New position in JSON format.
 */
export declare function getPositionShiftedBy(positionJSON: any, shift: number): any;
/**
 * Checks whether one position serialized to JSON is equal to other position serialized to JSON.
 */
export declare function arePositionsEqual(positionA: any, positionB: any): boolean;
/**
 * For the better compression result one of the two common roots (`main` or `$graveyard`)
 * is compressed to the `Boolean` format.
 *
 * Due tu the Protobuf limitation `Position` descriptor has no dedicated compressor
 * so we need to find and format all positions in the operation.
 */
export declare function parsePositionBeforeCompression(operation: any): void;
/**
 * Position reformatting after decompression.
 *
 * @see {parsePositionBeforeCompression}.
 */
export declare function parsePositionAfterCompression(operation: any): void;
