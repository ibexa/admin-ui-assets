/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/sidebar
 * @publicApi
 */
import { ContextPlugin, type Context, type Editor } from 'ckeditor5/src/core.js';
import type { FocusableView } from 'ckeditor5/src/ui.js';
import SidebarView from './view/sidebarview.js';
import SidebarItemView from './view/sidebaritemview.js';
import type Annotation from './annotation.js';
/**
 * Displays {@link module:comments/annotations/annotationcollection~AnnotationCollection annotations} inside a sidebar.
 *
 * `Sidebar` provides a {@link module:comments/annotations/view/sidebarview~SidebarView} which can be injected at any place on a website.
 *
 * It's main role is to display and correctly position annotation views added to the sidebar, accordingly to their target elements
 * or `Rect`s.
 *
 * The following plugins use `Sidebar` to provide annotations UI:
 *
 * * {@link module:comments/annotations/widesidebar~WideSidebar}
 * * {@link module:comments/annotations/narrowsidebar~NarrowSidebar}
 *
 * The sidebar plugin introduces {@link module:comments/annotations/view/sidebaritemview~SidebarItemView} which is a wrapper view for
 * {@link module:comments/annotations/view/annotationview~AnnotationView}. It adds an interface needed for positioning views inside
 * the sidebar.
 *
 * Structure of items:
 *
 *	                   |-> SidebarItemView -> AnnotationView -> added View
 *	Sidebar#view#list -|-> SidebarItemView -> AnnotationView -> added View
 *	                   |-> ...
 */
export default class Sidebar extends ContextPlugin {
    /**
     * Container element into which sidebar is injected (in the DOM).
     *
     * @observable
     */
    container: HTMLElement | null;
    /**
     * Sidebar view.
     */
    view: SidebarView;
    /**
     * @inheritDoc
     */
    static get pluginName(): "Sidebar";
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
    constructor(context: Context | Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Sets a new sidebar container.
     */
    setContainer(container: HTMLElement): void;
    /**
     * Rearranges annotations when the annotation is removed.
     */
    rearrange({ removedAnnotation, previousAnnotation, nextAnnotation }: {
        removedAnnotation: Annotation;
        previousAnnotation: Annotation | null;
        nextAnnotation: Annotation | null;
    }): void;
    /**
     * Refreshes sidebar items when one of the annotations is activated.
     *
     * @param options.activatedAnnotation The activated annotation.
     * @param options.blurredAnnotation The previously active annotation.
     * @param options.disableAnimationOnActivatedAnnotation Disables animation on the activated annotation.
     */
    refresh({ blurredAnnotation, activatedAnnotation, disableAnimationOnActivatedAnnotation }: {
        blurredAnnotation: Annotation | null;
        activatedAnnotation: Annotation | null;
        disableAnimationOnActivatedAnnotation?: boolean;
    }): void;
    /**
     * Creates new {@link module:comments/annotations/view/sidebaritemview~SidebarItemView} and binds its
     * position with {@link module:comments/annotations/view/annotationview~AnnotationView} target position.
     *
     * By default, annotation's view will be displayed in the sidebar. However, you can provide any other view
     * to be displayed instead using `annotationToDisplay`. `annotation` will be then used only to gather data needed by `Sidebar`.
     */
    addAnnotation(annotation: Annotation, viewToDisplay?: FocusableView): SidebarItemView;
    /**
     * Returns sidebar item view that wraps given annotation view.
     */
    getSidebarItemView(annotation: Annotation): SidebarItemView | undefined;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
