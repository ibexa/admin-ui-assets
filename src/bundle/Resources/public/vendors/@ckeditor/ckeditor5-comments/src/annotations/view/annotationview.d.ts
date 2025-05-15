/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/view/annotationview
 * @publicApi
 */
import { type FocusableView, View, type ViewCollection } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler, type Rect, type Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/annotation.css';
/**
 * A wrapping view for any view added to the `Annotations` plugin.
 *
 * It introduces functionalities that make the given view ready to be used as an annotation, such as focus tracking, height resizing,
 * and other observable properties that help share current annotation state across different UIs.
 */
export default class AnnotationView extends View implements FocusableView {
    /**
     * Tracks focus on the annotation view.
     *
     * Add a DOM element to this focus tracker to prevent blurring annotation view
     * when the DOM element is focused.
     */
    readonly focusTracker: FocusTracker;
    readonly id: string;
    readonly keystrokes: KeystrokeHandler;
    /**
     * Target rectangle to which the annotation should be attached.
     *
     * @observable
     */
    targetRect: Rect | null;
    /**
     * Annotation view height.
     *
     * @observable
     */
    height: number;
    /**
     * Informs if an annotation is active.
     *
     * @observable
     */
    isActive: boolean;
    /**
     * Informs if there are unsaved changes in the annotation.
     *
     * @observable
     */
    isDirty: boolean;
    /**
     * The number of items in the annotation.
     *
     * @observable
     */
    length: number;
    /**
     * @observable
     */
    type: string;
    element: HTMLElement;
    /**
     * Collection for content views.
     */
    content: ViewCollection<FocusableView>;
    /**
     * The inner annotation view.
     */
    mainView: AnnotationMainView;
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, mainView: AnnotationMainView);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Focuses the annotation view.
     */
    focus(): void;
}
export interface AnnotationMainView extends FocusableView {
    isActive: boolean;
}
