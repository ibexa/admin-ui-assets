/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/collaborationoperation
 * @publicApi
 */
import type { Operation, InsertOperation, MergeOperation, MoveOperation, SplitOperation, MarkerOperation, RootOperation, RootAttributeOperation } from 'ckeditor5/src/engine.js';
/**
 * Extends the {@link module:engine/model/operation/operation operation}.
 */
export default interface CollaborationOperation extends Operation {
    _isInit?: boolean;
    _authorId?: null | string;
    _isDisconnection?: boolean;
    createdAt?: Date;
    wasUndone?: boolean;
    affectsData?: Record<string, any>;
    clone(): CollaborationOperation;
}
export type InsertCollaborationOperation = CollaborationOperation & InsertOperation;
export type MoveCollaborationOperation = CollaborationOperation & MoveOperation;
export type MergeCollaborationOperation = CollaborationOperation & MergeOperation;
export type SplitCollaborationOperation = CollaborationOperation & SplitOperation;
export type MarkerCollaborationOperation = CollaborationOperation & MarkerOperation;
export type RootCollaborationOperation = CollaborationOperation & RootOperation;
export type RootAttributeCollaborationOperation = CollaborationOperation & RootAttributeOperation;
