/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { User } from 'ckeditor5-collaboration/src/collaboration-core.js';
declare const ChangeItem_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Represents a singular change entry in the revision or in the revisions comparison.
 */
export default class ChangeItem extends /* #__PURE__ -- @preserve */ ChangeItem_base {
    /**
     * Unique change item id.
     */
    readonly id: string;
    /**
     * User who created the change.
     */
    readonly author: User;
    /**
     * Change type.
     */
    readonly type: string;
    /**
     * Additional details about the change.
     */
    readonly data: Record<string, unknown>;
    /**
     * Name of the root which contains the change.
     */
    readonly rootName: string;
    /**
     * The date when the change was created.
     *
     * @observable
     */
    readonly createdAt: Date;
    constructor(data: ChangeItemInput);
    toJSON(): ChangeItemJSON;
}
export interface ChangeItemInput {
    id?: string;
    author: User;
    type: string;
    data: Record<string, unknown>;
    createdAt: Date;
    rootName: string;
}
export interface ChangeItemJSON {
    id: string;
    authorId: string;
    type: string;
    data: Record<string, unknown>;
    createdAt: Date;
}
export {};
