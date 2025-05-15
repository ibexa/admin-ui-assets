/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/annotationcollection
 * @publicApi
 */
import { Collection } from 'ckeditor5/src/utils.js';
import type { View } from 'ckeditor5/src/ui.js';
import type Annotation from './annotation.js';
/**
 * A collection of {@link module:comments/annotations/annotation~Annotation annotations}.
 *
 * It implements methods for managing annotations and creates a focus tracker for them to make it easier to manage
 * the focus for all annotations.
 *
 * `AnnotationCollection` fires {@link module:comments/annotations/annotationcollection~AnnotationCollection#event:focus} when an annotation
 * becomes focused and {@link module:comments/annotations/annotationcollection~AnnotationCollection#event:blur} when all annotations
 * lose focus.
 */
export default class AnnotationCollection extends Collection<Annotation> {
    /**
     * @param annotations Initial annotations.
     */
    constructor(annotations?: Iterable<Annotation>);
    /**
    * Equals to `true` when one of the annotation in the collection is focused.
    */
    get isFocused(): boolean;
    /**
     * Adds an annotation to the collection.
     */
    add(annotation: Annotation): this;
    /**
     * Removes the annotation from the collection.
     */
    remove(annotation: Annotation): Annotation;
    /**
     * Gets the annotation for a given annotation view's inner view.
     */
    getByInnerView(innerView: View): Annotation | undefined;
    /**
     * Gets the annotation for a given annotation view.
     */
    getByView(view: View): Annotation | undefined;
    /**
     * Destroys all bindings and clears the collection.
     */
    destroy(): void;
    /**
     * Refreshes the positioning of all annotations and sorts them topmost and leftmost.
     */
    refreshPositioning(): void;
}
/**
 * Fired when an annotation becomes active.
 *
 * @eventName ~AnnotationCollection#focus
 * @param annotation An annotation that was focused.
 */
export type AnnotationFocusEvent = {
    name: 'focus';
    args: [annotation: Annotation];
};
/**
 * Fired when all annotations become blurred.
 *
 * @eventName ~AnnotationCollection#blur
 */
export type AnnotationBlurEvent = {
    name: 'blur';
    args: [];
};
/**
 * A helper function that binds two {@link module:comments/annotations/annotationcollection~AnnotationCollection AnnotationCollection}s
 * and allows filtering items based on the passed callback.
 *
 * Since {@link module:comments/annotations/annotationcollection~AnnotationCollection#refreshPositioning}
 * sorts the annotations by removing and inserting items, the binding implemented by the `bindTo()` method is lost. This is why
 * this helper needs to be used.
 *
 * This helper is used by the annotations UIs to filter which annotations from the
 * {@link module:comments/annotations/annotations~Annotations#collection main annotation collection} should be handled by
 * a given annotations UI.
 *
 * @param `options.source` The source collection
 * from which the annotations will be taken.
 * @param `options.target` The target collection
 * that will be synced to the source collection.
 * @param options.filter Filtering function that gets an annotation and should return `true` if the annotation should be
 * copied to the `target` collection.
 */
export declare function bindAnnotationCollections({ source, target, filter }: {
    source: AnnotationCollection;
    target: AnnotationCollection;
    filter: (annotation: Annotation) => boolean;
}): void;
