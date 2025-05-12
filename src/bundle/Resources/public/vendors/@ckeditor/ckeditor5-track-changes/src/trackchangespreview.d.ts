/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/trackchangespreview
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { Dialog } from 'ckeditor5/src/ui.js';
import TrackChangesData from './trackchangesdata.js';
import '../theme/trackchangespreview.css';
/**
 * Plugin allowing to preview the final content where all the suggestions are accepted.
 */
export default class TrackChangesPreview extends Plugin {
    static get requires(): readonly [typeof TrackChangesData, typeof Dialog];
    static get pluginName(): "TrackChangesPreview";
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
    constructor(editor: Editor);
}
