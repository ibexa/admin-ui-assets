/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module utils/splicearray
 */
/**
 * Splices one array into another. To be used instead of `Array.prototype.splice` for better
 * performance and because the latter may throw "Maximum call stack size exceeded" error when
 * passing huge number of items to insert.
 *
 * ```ts
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 0 );	// [ 3, 4, 1, 2 ]
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 1 );	// [ 1, 3, 4, 2 ]
 * spliceArray( [ 1, 2 ], [ 3, 4 ], 2 );	// [ 1, 2, 3, 4 ]
 * spliceArray( [ 1, 2 ], [],       0 );	// [ 1, 2 ]
 * ```
 *
 * @param target Array to be spliced.
 * @param source Array of elements to be inserted to target.
 * @param start Index at which nodes should be inserted/removed.
 * @param count Number of items.
 *
 * @returns New spliced array.
 */
export default function spliceArray<T>(targetArray: Array<T>, insertArray: Array<T>, index: number): void;
