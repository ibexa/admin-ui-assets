/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * Creates mutation observer to observe changes that might cause height change.
 *
 * @param callback Callback executed after throttled mutations.
 */
export default function createMutationObserver(callback: (...args: Array<any>) => unknown): MutationObserver;
export interface MutationObserver {
    attach: (element: Node) => void;
    detach: () => void;
}
