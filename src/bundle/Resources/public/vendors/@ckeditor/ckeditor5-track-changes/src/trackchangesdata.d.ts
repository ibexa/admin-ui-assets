/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchangesdata
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import TrackChangesEditing from './trackchangesediting.js';
/**
 * This plugin returns the editor data with accepted or discarded suggestions without modifying the editor content.
 */
export default class TrackChangesData extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TrackChangesEditing];
    /**
     * @inheritDoc
     */
    static get pluginName(): "TrackChangesData";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Returns the editor data with all the suggestions accepted.
     *
     * @param options Options for {@link module:engine/controller/datacontroller~DataController#get}.
     * @returns A promise which resolves with the output data.
     */
    getDataWithAcceptedSuggestions(options?: Record<string, unknown>): Promise<string | Record<string, string>>;
    /**
     * Returns the editor data with all the suggestions discarded.
     *
     * @param options Options for {@link module:engine/controller/datacontroller~DataController#get}.
     * @returns A promise which resolves with the output data.
     */
    getDataWithDiscardedSuggestions(options: Record<string, unknown>): Promise<string | Record<string, string>>;
}
