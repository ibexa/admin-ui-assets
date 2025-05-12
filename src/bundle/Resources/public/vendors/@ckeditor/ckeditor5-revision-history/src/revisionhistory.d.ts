/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisionhistory
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import type { Item, Position } from 'ckeditor5/src/engine.js';
import RevisionTracker from './revisiontracker.js';
import RevisionHistoryUI from './ui/revisionhistory/revisionhistoryui.js';
import type { default as Revision, RevisionJSON } from './revision.js';
import type { RevisionHistoryAdapter } from './revisionhistoryadapter.js';
/**
 * Fake plugin to avoid UBB requests from virtual editor.
 * License key checker knows not to send the request when this plugin is loaded.
 */
export declare class RevisionViewerIntegration extends Plugin {
    result: string;
    static get pluginName(): "RevisionViewerIntegration";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    constructor(editor: Editor);
}
/**
 * The revision history feature.
 *
 * Enables tracking and bundling changes into revisions as well as provides the default UI for browsing revisions.
 *
 * To learn more about the revision history feature refer to the
 * {@glink features/collaboration/revision-history/revision-history Revision history} guide.
 */
export default class RevisionHistory extends Plugin {
    /**
     * Indicates whether the revision history viewer is currently visible.
     *
     * @observable
     */
    isRevisionViewerOpen: boolean;
    static get pluginName(): "RevisionHistory";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    static get requires(): readonly [typeof RevisionTracker, typeof RevisionHistoryUI];
    constructor(editor: Editor);
    /**
     * An adapter object that should communicate with the data source to fetch or save the revisions data.
     */
    set adapter(adapter: RevisionHistoryAdapter | null);
    get adapter(): RevisionHistoryAdapter | null;
    /**
     * Creates a revision basing on given revision data and adds it to the revision tracker and revision repository.
     *
     * The parameter of this method should be an object with revision data. You can receive such an object by calling
     * {@link module:revision-history/revisionhistory~RevisionHistory#getRevisions `RevisionHistory#getRevisions( { toJSON: true } )`}
     * or {@link module:revision-history/revision~Revision#toJSON `Revision#toJSON()`}.
     *
     * ```ts
     * // Get revisions data in an appropriate format.
     * // You can save it in your database.
     * const revisionsData = revisionHistory.getRevisions( { toJSON: true } );
     * // ...
     * // Use revisions data.
     * // That revisions data might be loaded from your database.
     * revisionsData.forEach( revisionData => revisionHistory.addRevisionData( revisionData ) );
     * ```
     */
    addRevisionData(revisionData: RevisionJSON): Revision;
    /**
     * Returns the revision with a given revision id or at a given index.
     */
    getRevision(revisionIdOrIndex: string | number): Revision | null;
    getRevisions(options: {
        toJSON: true;
    }): Array<RevisionJSON>;
    getRevisions(options: {
        toJSON: false;
    }): Array<Revision>;
    getRevisions(options: {
        toJSON: boolean;
    }): Array<Revision> | Array<RevisionJSON>;
}
export interface TapeValue {
    id?: number;
    type: 'elementStart' | 'elementEnd' | 'text';
    item: TapeItem;
    previousPosition?: Position;
    nextPosition?: Position;
    isAdded?: {
        userId: string;
    } | boolean;
    isRemoved?: {
        userId: string;
    };
    pairId?: number | null;
    markersStart?: Array<string>;
    markersEnd?: Array<string>;
    isIncorrect?: boolean;
    distance?: number;
    isAddSuggestion?: {
        userId: string;
        type: string;
        name: string;
    };
    isRemoveSuggestion?: {
        userId: string;
        type: string;
        name: string;
    };
    side?: number;
    level?: number;
    index?: number;
}
export type TapeItem = Item & {
    name: string;
    startIndex?: number;
    endIndex?: number;
};
