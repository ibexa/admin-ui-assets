/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisiondiff
 */
import { Collection } from 'ckeditor5/src/utils.js';
import type { DocumentFragment } from 'ckeditor5/src/engine.js';
import type ChangeItem from './changeitem.js';
/**
 * Represents a difference between two document revisions.
 */
export default class RevisionDiff {
    readonly newRevisionId: string;
    readonly oldRevisionId: string;
    readonly changes: Collection<ChangeItem>;
    constructor(newRevisionId: string, oldRevisionId: string);
}
export interface DiffData {
    model: Record<string, DocumentFragment>;
    attributes: Record<string, Record<string, unknown>>;
    changes: Array<ChangeItem>;
}
