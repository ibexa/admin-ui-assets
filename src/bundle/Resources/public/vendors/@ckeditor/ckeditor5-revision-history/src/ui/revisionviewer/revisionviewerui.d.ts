/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionviewer/revisionviewerui
 */
import { Plugin } from 'ckeditor5/src/core.js';
import RevisionViewer from './../../revisionviewer.js';
import RevisionViewerLoadingOverlay from './revisionviewerloadingoverlay.js';
import '../../../theme/revisionviewer.css';
/**
 * TODO
 */
export default class RevisionViewerUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "RevisionViewerUI";
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
    static get requires(): readonly [typeof RevisionViewer, typeof RevisionViewerLoadingOverlay];
    /**
     * @inheritDoc
     */
    init(): void;
}
