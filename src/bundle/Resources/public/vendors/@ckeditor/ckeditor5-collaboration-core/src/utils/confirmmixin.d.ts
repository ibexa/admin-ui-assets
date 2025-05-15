/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/utils/confirmmixin
 */
import type { View } from 'ckeditor5/src/ui.js';
import type { Locale, Mixed } from 'ckeditor5/src/utils.js';
/**
 * Adds interface for showing confirmation view in the specific for `CommentThreadView` and `CommentView` structure
 * Confirm is always set to the `content` collection at the last position.
 */
export default function ConfirmMixin<Base extends new (...args: Array<any>) => View>(base: Base): Mixed<Base, ConfirmApi>;
export interface ConfirmApi {
    isConfirm: boolean;
    locale: Locale;
    showConfirm(message: string, element: Element): Promise<unknown>;
    cancelConfirm(): void;
}
export type RemoveConfirmEvent = {
    name: 'removeConfirm';
    args: [];
};
