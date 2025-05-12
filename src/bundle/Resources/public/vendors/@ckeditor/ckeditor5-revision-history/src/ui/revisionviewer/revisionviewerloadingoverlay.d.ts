/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revisionviewer/revisionviewerloadingoverlay
 */
import { Plugin } from 'ckeditor5/src/core.js';
import '../../../theme/revisionviewerloadingoverlay.css';
/**
 * TODO
 */
export default class RevisionViewerLoadingOverlay extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "RevisionViewerLoadingOverlay";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * TODO
     */
    show(): void;
    /**
     * TODO
     */
    hide(): void;
}
