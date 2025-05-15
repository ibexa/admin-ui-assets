/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/widesidebar
 * @publicApi
 */
import { ContextPlugin, Context, type Editor } from 'ckeditor5/src/core.js';
import AnnotationsUIs, { type AnnotationsUI } from './annotationsuis.js';
import Sidebar from './sidebar.js';
import type Annotation from './annotation.js';
import type { default as AnnotationCollection } from './annotationcollection.js';
/**
 * The wide sidebar UI for displaying annotations.
 *
 * In this implementation {@link module:comments/annotations/sidebar~Sidebar the sidebar} displays full
 * {@link module:comments/annotations/view/annotationview~AnnotationView annotation views}.
 *
 * To activate this UI use one of the following:
 *
 * ```ts
 * editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'wideSidebar' );
 * editor.plugins.get( 'AnnotationsUIs' ).activate( 'wideSidebar', filter );
 * ```
 *
 * See {@link module:comments/annotations/annotationsuis~AnnotationsUIs}.
 */
export default class WideSidebar extends ContextPlugin implements AnnotationsUI<ContextPlugin> {
    /**
     * An active annotation tracked by this UI.
     *
     * @observable
     */
    activeAnnotation: Annotation | null;
    isAttached: boolean;
    /**
     * A collection of annotations controlled by this UI.
     *
     * This property is readonly and should not be operated on directly. Use it only to read which annotations are added to this UI.
     *
     * It is set to `null` if `WideSidebar` is not {@link module:comments/annotations/widesidebar~WideSidebar#attach attached}.
     */
    annotations: AnnotationCollection | null;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Sidebar, typeof AnnotationsUIs];
    /**
     * @inheritDoc
     */
    static get pluginName(): "WideSidebar";
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
     * Sets the active annotation for this UI.
     */
    setActiveAnnotation(annotation: Annotation | null): void;
    /**
     * @inheritDoc
     */
    attach(annotations: AnnotationCollection): void;
    /**
     * @inheritDoc
     */
    detach(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
