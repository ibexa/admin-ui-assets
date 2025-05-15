/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/inlineannotations
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import AnnotationsUIs, { type AnnotationsUI } from './annotationsuis.js';
import EditorAnnotations from './editorannotations.js';
import { ContextualBalloon } from 'ckeditor5/src/ui.js';
import './../../theme/annotation-inline.css';
import type Annotation from './annotation.js';
import type AnnotationCollection from './annotationcollection.js';
/**
 * The popup-style UI for displaying annotations next to editor target elements.
 *
 * It displays {@link module:comments/annotations/annotation~Annotation annotations} in the
 * {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon balloon} where the current
 * {@link module:comments/annotations/inlineannotations~InlineAnnotations#activeAnnotation} is the displayed one.
 *
 * Note: this UI type works only with {@link module:core/editor/editor~Editor the Editor} and cannot be used in integrations where
 * there is only {@link module:core/context~Context context} without any editor.
 *
 * This UI is intended for narrow screens.
 *
 * To activate this UI use one of the following:
 *
 * ```ts
 * editor.plugins.get( 'AnnotationsUIs' ).switchTo( 'inline' );
 * editor.plugins.get( 'AnnotationsUIs' ).activate( 'inline', filter );
 * ```
 *
 * See {@link module:comments/annotations/annotationsuis~AnnotationsUIs}.
 */
export default class InlineAnnotations extends Plugin implements AnnotationsUI<Plugin> {
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
     * It is set to `null` if `InlineAnnotations` is not
     * {@link module:comments/annotations/inlineannotations~InlineAnnotations#attach attached}.
     */
    annotations: AnnotationCollection | null;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof EditorAnnotations, typeof ContextualBalloon, typeof AnnotationsUIs];
    /**
     * @inheritDoc
     */
    static get pluginName(): "InlineAnnotations";
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
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
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
