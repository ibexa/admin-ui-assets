/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/view/commentslistview
 */
import { View, FocusCycler, type ViewCollection, type FocusableView } from 'ckeditor5/src/ui.js';
import { FocusTracker, type Locale } from 'ckeditor5/src/utils.js';
import type AnnotationView from '../../../annotations/view/annotationview.js';
/**
 * A view representing the content of comments archive.
 */
export default class CommentsArchiveView extends View implements FocusableView {
    /**
     * The flag indicating whether there are items to display in the comments archive.
     *
     * @observable
     */
    isEmpty: boolean;
    /**
     * Tracks information about the DOM focus in the comments archive.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Helps cycling over {@link #_focusables} in the form.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @param locale The localization service instance.
     * @param annotationViews Resolved comment thread annotation views to render inside the comments archive.
     */
    constructor(locale: Locale, annotationViews: ViewCollection<AnnotationView>);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * @inheritDoc
     */
    focus(): void;
}
