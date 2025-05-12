/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/editorannotations
 * @publicApi
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import Annotations from './annotations.js';
import type Annotation from './annotation.js';
import type AnnotationCollection from './annotationcollection.js';
/**
 * Integrates {@link module:comments/annotations/annotations~Annotations annotations} with the editor to provide proper behavior
 * for annotations created through the editor features.
 *
 * *Note: The API of this class might change in the near future.*
 *
 * Collects all types of the annotations created through the editor features and their markers and decides which annotation is currently
 * selected by the selection.
 *
 * Every editor plugin that adds an annotation should also
 * {@link module:comments/annotations/editorannotations~EditorAnnotations#addSourceCollector register a callback}
 * in which it will check whether given annotation should be marked as selected.
 */
export default class EditorAnnotations extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Annotations];
    /**
     * @inheritDoc
     */
    static get pluginName(): "EditorAnnotations";
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
     * Registers given annotation as an editor annotation, that is an annotation that is linked with a target inside the editor content.
     */
    registerAnnotation(annotation: Annotation): void;
    hasDomSelection(): boolean;
    /**
     * Registers a callback that collects annotations and their markers.
     */
    addSourceCollector(callback: Function): void;
    /**
     * Finds all annotations selected by the editor selection and marks the most inner one as the active annotation.
     */
    refreshSelectedViews(): void;
    /**
     * Finds all annotations for selected markers in order from the most inner marker to the most outer marker.
     *
     * @param options.annotations The collection of annotations for given UI.
     * @param options.activeAnnotation The given UI active annotation.
     * It is used to determine the order if the selection contains the active annotation's marker.
     */
    getOrderedSelectedAnnotations({ activeAnnotation, annotations }: {
        activeAnnotation: Annotation | null;
        annotations: AnnotationCollection;
    }): Array<Annotation>;
}
