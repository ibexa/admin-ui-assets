/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisiontracker
 * @publicApi
 */
import { Users, type CollaborationHistory } from 'ckeditor5-collaboration/src/collaboration-core.js';
import { Plugin, PendingActions, type Editor } from 'ckeditor5/src/core.js';
import RevisionsRepository from './revisionsrepository.js';
import RevisionHistoryUtils from './revisionhistoryutils.js';
import type { default as Revision, RevisionData } from './revision.js';
/**
 * Creates and updates revisions based on changes of the editor content.
 *
 * There are always at least two revisions available for the document: the initial revision and the current revision.
 * If those revisions have not been created for the document yet, they are created when the editor data is loaded.
 *
 * The initial revision contains the initial document data from when the document was loaded for the first time.
 *
 * The current revision contains all the unsaved document changes, that is changes which have not been saved yet as a specific revision.
 * The current revision is always available and it is always the "top" revision (most recent).
 */
export default class RevisionTracker extends Plugin {
    /**
     * The revision instance that is used as a special "current revision", that is a revision that gathers all changes that have happened
     * since the latest revision was saved.
     */
    currentRevision: Revision | null;
    /**
     * `RevisionsRepository` plugin instance, holds revisions managed by `RevisionTracker`.
     */
    repository: RevisionsRepository;
    static get pluginName(): "RevisionTracker";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    static get requires(): readonly [typeof Users, typeof RevisionsRepository, typeof RevisionHistoryUtils, typeof PendingActions];
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    afterInit(): Promise<void>;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Adds the new document changes to the current revision.
     *
     * This method should be called before document data and revision data is saved (for example, in the autosave callback).
     *
     * @returns Promise that is resolved after the revision is updated locally (the promise does not wait for the adapter update).
     */
    update(): Promise<void>;
    /**
     * Creates and saves a new revision.
     *
     * ```ts
     * // Saves all the unsaved changes as a revision without a name.
     * const myRevision = await revisionTracker.saveRevision();
     *
     * // Saves all the unsaved changes as a revision named 'My revision'.
     * const myRevision = await revisionTracker.saveRevision( { name: 'My revision' } );
     *
     * // Saves a revision named 'My revision'.
     * // It will include document data with all the changes up to document version `30`.
     * // The revision will be on "top" of the closest revision with a lower document version.
     * // The revision diff will include all the changes since the previous revision up to document version `30`.
     * const myRevision = await revisionTracker.saveRevision( { name: 'My revision' }, 30 );
     * ```
     *
     * A new revision can be created in the middle of the revision history. In such case, already existing revisions will be
     * appropriately updated.
     *
     * Using this method, a revision without a name can be created even if the
     * {@link module:revision-history/revisionhistoryconfig~RevisionHistoryConfig#requireRevisionName `requireRevisionName` }
     * configuration option is set to `true`.
     *
     * @param revisionData Revision data to set on the created revision.
     * @param version {@link module:engine/model/document~Document#version Document version} on which the revision is saved.
     * If not set, the revision will be saved for the current (most recent) document state.
     * @returns Promise that resolves with the created revision after it is saved locally (the promise does not wait for the
     * adapter update).
     */
    saveRevision(revisionData?: RevisionData, version?: number | null): Promise<Revision>;
    /**
     * Creates a revision basing on given revision data and adds it to the revision tracker and revision repository.
     */
    addRevisionData(revisionData: RevisionData): Revision;
    /**
     * Returns document data for given revision.
     *
     * The document data is HTML or a different format, depending on the editor configuration.
     *
     * This method returns a promise which resolves with an object, where keys are root names and values are these roots' data. Most
     * editor setups use just one root, which has the default name `main`. In this case, the promise will resolve with an object
     * similar to this:
     *
     * ```ts
     * { main: "<p>Sample document data.</p>" }
     * ```
     *
     * If the adapter integration is used, this method will automatically load necessary
     * {@link module:revision-history/revision~Revision#diffData `Revision#diffData`} if it is missing.
     *
     * Please note, that the data returned by this method uses
     * {@link module:engine/dataprocessor/dataprocessor~DataProcessor#useFillerType marked fillers mode}. This means that some `&nbsp;`
     * characters in the returned data may be wrapped with `<span data-cke-filler="true">&nbsp;</span>`. Take this difference into
     * consideration if you plan to compare revision data with the data returned by `editor.getData()`.
     *
     * See also {@link module:revision-history/revisiontracker~RevisionTracker#getRevisionRootsAttributes}.
     */
    getRevisionDocumentData(revision: Revision): Promise<Record<string, string>>;
    /**
     * Returns roots attributes for given revision.
     *
     * This method returns a promise which resolves with an object, where keys are root names and values are these roots' attributes.
     * Most editor setups use just one root, which has the default name `main`. In this case, the promise will resolve with an object
     * similar to this:
     *
     * ```ts
     * { main: {} }
     * ```
     *
     * See also {@link module:revision-history/revisiontracker~RevisionTracker#getRevisionDocumentData}.
     */
    getRevisionRootsAttributes(revision: Revision): Promise<Record<string, Record<string, unknown>>>;
}
export interface RevisionSource {
    history: CollaborationHistory;
    getLatestVersion: () => Promise<number>;
    getCurrentRevisionId: () => string;
}
