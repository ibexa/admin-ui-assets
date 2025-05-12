/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/annotation
 * @publicApi
 */
import { Rect, Collection } from 'ckeditor5/src/utils.js';
import type { View } from 'ckeditor5/src/ui.js';
import type AnnotationView from './view/annotationview.js';
import type { AnnotationOptions } from './annotations.js';
declare const Annotation_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Represents an annotation.
 *
 * Annotation is an entity that combines an {@link module:comments/annotations/view/annotationview~AnnotationView}
 * and an annotation target (a DOM element or a {@link module:utils/dom/rect~Rect}) to which the annotation is bound.
 */
export default class Annotation extends /* #__PURE__ -- @preserve */ Annotation_base {
    /**
     * The visibility of the annotation. Annotations that are not visible, are filtered from Annotation UI collections.
     *
     * @observable
     */
    isVisible: boolean;
    /**
     * The annotation view.
     */
    view: AnnotationView;
    /**
     * A collection of DOM elements which, when focused, make the annotation active.
     *
     * By default, this collection only contains the annotation view element.
     * It can be extended with custom targets that will be tracked by the annotation focus tracking system.
     */
    focusableElements: Collection<HTMLElement>;
    /**
     * Creates an instance of the {@link module:comments/annotations/annotation~Annotation}.
     */
    constructor({ view, target, type, isVisible }: AnnotationOptions);
    /**
     * The type of the annotation.
     */
    get type(): string;
    /**
     * The annotation inner view.
     *
     * It is the view that is wrapped by the annotation view.*
     */
    get innerView(): View;
    /**
     * The annotation target to which the annotation view should be pinned.
     *
     * It can be an array of DOM elements or {@link module:utils/dom/rect~Rect a rect instance} or `null`.
     */
    get target(): Rect | Array<HTMLElement> | null;
    /**
     * The position and dimensions of the annotation target to which the annotation is bound.
     */
    get targetRect(): Rect | null;
    /**
     * The state of the annotation.
     */
    get isActive(): boolean;
    set isActive(value: boolean);
    /**
     * Updates the target rect in the annotation view instance.
     */
    updateTargetRect(): void;
    /**
     * Clears all event listeners and internal collections.
     */
    destroy(): void;
    /**
     * Refreshes the visibility of the annotation based on the visibility of the annotation target.
     *
     * It sets the {@link #isVisible} property when the target is not attached to DOM or if the target or its descendant has
     * set the `display` attribute to `none`.
     *
     * This method only updates an annotation if the annotation target is an HTML Element.
     */
    refreshVisibility(): void;
}
type Target = Rect | HTMLElement | null;
export type AnnotationTarget = Target | (() => Target | Array<Target>);
/**
 * An event fired when the user pressed Escape key while the annotation view was focused.
 */
export type AnnotationEscapeEvent = {
    name: string;
    args: [];
};
export {};
