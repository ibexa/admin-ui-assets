/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/collaborationhistory
 * @publicApi
 */
import type { default as CollaborationOperation } from './collaborationoperation.js';
/**
 * Interface compatible with {@link module:engine/model/history~History} with the difference that it uses
 * {@link module:collaboration-core/collaborationoperation~CollaborationOperation} instead of regular model operations.
 */
export default interface CollaborationHistory {
    _operations: Array<CollaborationOperation>;
    version: number;
    getOperations(fromBaseVersion?: number, toBaseVersion?: number): Array<CollaborationOperation>;
    getOperation(baseVersion: number): CollaborationOperation | undefined;
    addOperation(operation: CollaborationOperation): void;
    reset(): void;
}
