/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/commentsarchiveui
 * @publicApi
 */
import '../../theme/commentsarchive.css';
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { ViewCollection, Dialog } from 'ckeditor5/src/ui.js';
import CommentsArchiveView from './ui/view/commentsarchiveview.js';
import CommentsArchive from './commentsarchive.js';
import type AnnotationView from '../annotations/view/annotationview.js';
/**
 * Creates comments archive {@link module:ui/dropdown/dropdownview~DropdownView ui dropdown} and binds with
 * archived comment thread annotation views.
 */
export default class CommentsArchiveUI extends Plugin {
    /**
     * The view that is rendered in the dialog.
     */
    commentsArchiveView: CommentsArchiveView | undefined;
    /**
     * The view collection of {@link module:comments/annotations/view/annotationview~AnnotationView}
     * that is displayed inside {@link #commentsArchiveView}.
     */
    annotationViews: ViewCollection<AnnotationView>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsArchiveUI";
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
    static get requires(): readonly [typeof CommentsArchive, typeof Dialog];
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
}
