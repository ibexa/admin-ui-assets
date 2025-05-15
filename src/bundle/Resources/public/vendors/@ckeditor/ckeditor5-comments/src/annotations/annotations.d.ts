/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/annotations
 * @publicApi
 */
import { ContextPlugin, Editor, type Context } from 'ckeditor5/src/core.js';
import type { View } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import Annotation, { type AnnotationTarget } from './annotation.js';
import AnnotationCollection from './annotationcollection.js';
import AnnotationView, { type AnnotationMainView } from './view/annotationview.js';
/**
 * Stores and manages all {@link module:comments/annotations/annotation~Annotation annotations} created
 * for the entire {@link module:core/context~Context} or {@link module:core/editor/editor~Editor}.
 *
 * It allows for {@link module:comments/annotations/annotations~Annotations#add adding} and
 * {@link module:comments/annotations/annotations~Annotations#remove removing} annotations.
 *
 * It manages {@link module:comments/annotations/annotations~Annotations#activate activating} and
 * {@link module:comments/annotations/annotations~Annotations#deactivateAll deactivating} annotations. Using those methods will
 * result in setting {@link module:comments/annotations/annotationsuis~AnnotationUI#activeAnnotation} in the appropriate
 * {@link module:comments/annotations/annotationsuis~AnnotationsUI annotations UI} plugins.
 *
 * All active annotations are stored in {@link module:comments/annotations/annotations~Annotations#activeAnnotations}.
 *
 * `Annotations` is linked with {@link module:comments/annotations/annotationsuis~AnnotationsUIs}, which listens to events fired by
 * `Annotations` and propagates information to and from annotations UI plugins.
 */
export default class Annotations extends ContextPlugin {
    /**
     * A set of currently active annotations.
     *
     * @observable
     */
    activeAnnotations: Set<Annotation>;
    /**
     * A collection of all annotations. It should not be operated on directly.
     */
    readonly collection: AnnotationCollection;
    /**
     * @inheritDoc
     */
    static get pluginName(): "Annotations";
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
     * Adds an annotation to the collection.
     */
    add(annotation: Annotation): void;
    /**
     * Removes the given annotation from the collection.
     */
    remove(annotation: Annotation): void;
    /**
     * Refreshes the visibility of annotations based on the visibility of their annotation targets.
     *
     * This method should be called when one or more annotations' targets changed their visibility,
     * for example when one of the editors was shown or hidden.
     *
     * This method recalculates all annotations' {@link module:comments/annotations/annotation~Annotation#isVisible `isVisible`} property.
     */
    refreshVisibility(): void;
    /**
     * Refreshes the positioning of all visible annotations and sorts them topmost and leftmost.
     */
    refreshPositioning(): void;
    /**
     * Returns the annotation that "contains" the given annotation view's inner view.
     */
    getByInnerView(innerView: View): Annotation | undefined;
    /**
     * Deactivates all active annotations.
     *
     * @fires _deactivateAllAnnotations
     */
    deactivateAll(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Activates the given annotation.
     *
     * If annotations UI that handles the given annotation already has an active annotation,
     * then it deactivates it and activates the provided one.
     *
     * @fires _activateAnnotation
     */
    activate(annotation: Annotation): void;
    /**
     * Creates an annotation.
     *
     * ```ts
     * const annotationView = annotations.createAnnotationView( editor.locale, innerView );
     *
     * const annotation = annotations.createAnnotation( {
     * 	view: annotationView,
     * 	target: document.getElementById( 'target' ),
     * 	type: 'comment'
     * } );
     * ```
     *
     * @returns An annotation.
     */
    createAnnotation(options: AnnotationOptions): Annotation;
    /**
     * Creates an annotation view wrapper for the annotation content.
     *
     * ```ts
     * const innerView = createCustomView();
     * const annotationView = annotations.createAnnotationView( editor.locale, innerView );
     * ```
     *
     * @returns An annotation view.
     */
    createAnnotationView(locale: Locale, view: AnnotationMainView): AnnotationView;
}
/**
 * The configuration options which are used to create new {@link module:comments/annotations/annotation~Annotation annotations}.
 *
 * @param view The annotation view.
 * @param target The annotation target.
 * @param type The annotation type.
 * @param isVisible The initial visibility of the annotation.
 */
export interface AnnotationOptions {
    view: AnnotationView;
    target: AnnotationTarget;
    type: string | (() => string);
    isVisible?: boolean;
}
/**
 * An internal event that fires when the annotation should be activated.
 *
 * @eventName ~Annotations#_activateAnnotation
 */
export type ActivateAnnotationEvent = {
    name: '_activateAnnotation';
    args: [annotation: Annotation];
};
/**
 * An internal event that fires when all annotations should be deactivated.
 *
 * @eventName ~Annotations#_deactivateAllAnnotations
 */
export type DeactivateAllAnnotationsEvent = {
    name: '_deactivateAllAnnotations';
    args: [];
};
