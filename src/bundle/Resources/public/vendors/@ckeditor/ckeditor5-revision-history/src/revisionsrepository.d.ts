/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisionsrepository
 * @publicApi
 */
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { default as Revision, type RevisionData, type RevisionJSON } from './revision.js';
/**
 * Manages revisions list.
 */
export default class RevisionsRepository extends Plugin {
    static get requires(): readonly [typeof Users];
    static get pluginName(): "RevisionsRepository";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    get length(): number;
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * Creates a revision instance from plain object with revision data.
     */
    createRevision(revisionData: RevisionData): Revision;
    /**
     * Adds revision to the repository on a given index.
     *
     * @param revision The revision instance to add.
     * @param index Index on which the revision should be added. If not set, the revision will be added as the first revision.
     */
    addRevision(revision: Revision, index?: number): void;
    /**
     * Returns the revision with a given revision id or at a given index.
     */
    getRevision(revisionIdOrIndex: string | number): Revision | null;
    getRevisions(options: {
        toJSON: true;
    }): Array<RevisionJSON>;
    getRevisions(options?: {
        toJSON: false;
    }): Array<Revision>;
    getRevisions(options: {
        toJSON: boolean;
    }): Array<Revision> | Array<RevisionJSON>;
    /**
     * Returns the index of the revision with a given revision id.
     */
    getIndex(revisionId: string | Revision): number;
}
