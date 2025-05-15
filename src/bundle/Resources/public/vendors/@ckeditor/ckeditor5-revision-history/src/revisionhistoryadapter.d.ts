/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisionhistoryadapter
 * @publicApi
 */
import type { RevisionData } from './revision.js';
/**
 * The revision history adapter.
 *
 * The revision history adapter is an object that communicates asynchronously with the data source to fetch or save
 * the revisions data. It is used internally by the revision history feature whenever revision data is required, a revision is created,
 * or updated.
 *
 * The adapter is optional. See the {@glink features/collaboration/revision-history/revision-history-integration
 * Revision history feature integration} guide to learn more.
 *
 * To set the adapter, overwrite the {@link module:revision-history/revisionhistory~RevisionHistory#adapter `RevisionHistory#adapter`}
 * property.
 */
export interface RevisionHistoryAdapter {
    /**
     * Called when the full revision data is required.
     *
     * It should return a promise that resolves with the whole revision data.
     */
    getRevision(data: {
        revisionId: string;
        channelId: string;
    }): Promise<RevisionData>;
    /**
     * Called when revision(s) data is added or updated.
     *
     * Multiple revisions can be added and updated at the same moment. The method is passed an array with the updated data.
     * Each item in the array is a data object that describes a single revision. Each data object contains revision id. If the revision
     * id does not exist in your data source (database), then a new revision should be created. Otherwise, the existing revision
     * should be updated with passed data.
     *
     * The method should return a promise that is resolved when the update is completed.
     *
     * The `data` parameter only contains those properties of a revision that have changed.
     *
     * Although the `data` parameter contains `createdAt` property,
     * the revision creation date should be set by the backend of your application
     * to ensure that all revisions will be saved with correct dates regardless of users' local system time.
     * It is recommended to overwrite `createdAt` value whenever it is passed in the `data` parameter.
     *
     * The promise may resolve with an array of objects. Each object represents an updated revision, for which `createdAt` property
     * was set (or changed) on the backend. Each object should have `id` (string) and `createdAt` (`Date` object) properties.
     * The returned data will be used to update revisions data in the editor with dates set on the backend.
     *
     * Although the `data` parameter contains `creatorId` property, you should verify the `creatorId` value when saving a revision
     * in the database. **However, do not overwrite the value if it was set to `null`!**
     *
     * It is recommended to stringify `data.diffData` and `data.attributes` values to JSON and save them as strings in your database,
     * and then to parse the strings when loading revisions.
     *
     * @param data Array with revisions data to add or update.
     * @param channelId The ID of the document for which the revisions were created.
     */
    updateRevisions(data: Array<RevisionData>, channelId: string): Promise<Array<RevisionData>>;
}
