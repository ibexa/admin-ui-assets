/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/revisionhistoryutils
 */
import { Plugin } from 'ckeditor5/src/core.js';
import type { RevisionHistoryAdapter } from './revisionhistoryadapter.js';
import type { default as Revision } from './revision.js';
/**
 * Common utilities used by plugins in the revision history package.
 */
export default class RevisionHistoryUtils extends Plugin {
    static get pluginName(): "RevisionHistoryUtils";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * Loads {@link module:revision-history/revision~Revision#diffData} of a specified `revision` if it has not been loaded yet.
     */
    loadRevisionData(revision: Revision, adapter: RevisionHistoryAdapter | null): Promise<void>;
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
     * Please note, that the data returned by this method uses
     * {@link module:engine/dataprocessor/dataprocessor~DataProcessor#useFillerType marked fillers mode}. This means that some `&nbsp;`
     * characters in the returned data may be wrapped with `<span data-cke-filler="true">&nbsp;</span>`. Take this difference into
     * consideration if you plan to compare revision data with the data returned by `editor.getData()`.
     *
     * See also {@link module:revision-history/revisionhistoryutils~RevisionHistoryUtils#getRevisionRootsAttributes}.
     */
    getRevisionDocumentData(revision: Revision): Record<string, string>;
    /**
     * Returns roots attributes for given revision.
     *
     * This method returns a promise which resolves with an object, where keys are root names and values are these roots' attributes.
     *
     * Most editor setups use just one root, which has the default name `main`. Also, most editor setup do not use any root attributes.
     * In this case, the promise will resolve with following object:
     *
     * ```ts
     * { main: {} }
     * ```
     *
     * See also {@link module:revision-history/revisionhistoryutils~RevisionHistoryUtils#getRevisionDocumentData}.
     */
    getRevisionRootsAttributes(revision: Revision): Record<string, Record<string, unknown>>;
}
