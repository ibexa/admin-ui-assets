/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/narrowsidebar
 * @publicApi
 */
import { ContextPlugin, Context, type Editor } from 'ckeditor5/src/core.js';
import AnnotationsUIs, { type AnnotationsUI } from './annotationsuis.js';
import Sidebar from './sidebar.js';
import { BalloonPanelView, BodyCollection } from 'ckeditor5/src/ui.js';
import '../../theme/sidebar-narrow.css';
import type Annotation from './annotation.js';
import type { default as AnnotationCollection } from './annotationcollection.js';
/**
 * The narrow sidebar UI for displaying annotations.
 *
 * Binds {@link module:comments/annotations/annotations~Annotations} plugin with
 * {@link module:comments/annotations/sidebar~Sidebar} plugin to display annotations in the sidebar as
 * {@link module:comments/annotations/view/annotationcounterbuttonview~AnnotationCounterButtonView small icons}.
 *
 * After selecting an annotation the {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView} with an
 * {@link module:comments/annotations/view/annotationview~AnnotationView} appears attached to the sidebar item.
 *
 * This UI is intended for medium-sized viewports.
 *
 * To activate this UI use one of the following:
 *
 * ```ts
 * editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'narrowSidebar' );
 * editor.plugins.get( 'AnnotationsUIs' ).activate( 'narrowSidebar', filter );
 * ```
 *
 * See {@link module:comments/annotations/annotationsuis~AnnotationsUIs}.
 */
export default class NarrowSidebar extends ContextPlugin implements AnnotationsUI<ContextPlugin> {
    /**
     * An active annotation tracked by this UI.
     */
    activeAnnotation: Annotation | null;
    bodyCollection: BodyCollection;
    balloonPanelView: BalloonPanelView;
    isAttached: boolean;
    /**
     * A collection of annotations controlled by this UI.
     *
     * This property is readonly and should not be operated on directly. Use it only to read which annotations are added to this UI.
     *
     * It is set to `null` if `NarrowSidebar` is not {@link module:comments/annotations/narrowsidebar~NarrowSidebar#attach attached}.
     */
    annotations: AnnotationCollection | null;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Sidebar, typeof AnnotationsUIs];
    /**
     * @inheritDoc
     */
    static get pluginName(): "NarrowSidebar";
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
     * @inheritDoc
     */
    attach(annotations: AnnotationCollection): void;
    /**
     * Sets the active annotation for this UI.
     */
    setActiveAnnotation(annotation: Annotation | null): void;
    /**
     * @inheritDoc
     */
    detach(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
