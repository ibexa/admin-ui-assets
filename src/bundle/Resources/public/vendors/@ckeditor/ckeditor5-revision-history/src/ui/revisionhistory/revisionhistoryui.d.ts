/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionhistory/revisionhistoryui
 */
import { Plugin } from 'ckeditor5/src/core.js';
import RevisionTracker from '../../revisiontracker.js';
/**
 * TODO
 */
export default class RevisionHistoryUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "RevisionHistoryUI";
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
    static get requires(): readonly [typeof RevisionTracker];
    /**
     * @inheritDoc
     */
    init(): void;
}
