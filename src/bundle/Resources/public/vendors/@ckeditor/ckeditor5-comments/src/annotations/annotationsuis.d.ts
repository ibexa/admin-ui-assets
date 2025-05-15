/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/annotationsuis
 * @publicApi
 */
import { ContextPlugin, type Plugin, type Editor, type Context } from 'ckeditor5/src/core.js';
import { type Emitter } from 'ckeditor5/src/utils.js';
import AnnotationCollection from './annotationcollection.js';
import Annotations from './annotations.js';
import type Annotation from './annotation.js';
/**
 * A repository of annotations UIs.
 *
 * The main entry point for {@link module:comments/annotations/annotationsuis~AnnotationsUIs#register registering} UIs
 * and activating the annotations UI(s), which display annotation views.
 *
 * To register a custom annotations UI use following code in the annotations UI plugin `init()` function:
 *
 * ```ts
 * const annotationsUIs = editor.plugins.get( 'annotationsUIs' );
 *
 * annotationsUIs.register( customAnnotationsUIPlugin );
 * ```
 *
 * Note that the custom annotations UI must implement {@link module:comments/annotations/annotationsuis~AnnotationsUI
 * the `AnnotationsUI` interface}.
 *
 * To activate an annotations UI, use the {@link module:comments/annotations/annotationsuis~AnnotationsUIs#switchTo
 * `switchTo( uiName )`} method. This method activates the given UI and deactivates all the other UIs.
 * All annotations will be handled by the activated UI.
 *
 * It is also possible to activate multiple annotations UIs at the same time and make the UIs handle different sets of annotations.
 * To do that, use the {@link module:comments/annotations/annotationsuis~AnnotationsUIs#activate `activate( uiName, filter )`} method.
 *
 * ```ts
 * // Suggestions annotations are shown inline in a balloon:
 * annotationsUIs.activate( 'inline', annotation => annotation.type.startsWith( 'suggestion' ) );
 *
 * // At the same time, comments annotations are shown in a sidebar:
 * annotationsUIs.activate( 'wideSidebar', annotation => annotation.type === 'comment' );
 * ```
 *
 * Limitations:
 *
 * * Some annotations UI plugins might collide with each other (like {@link module:comments/annotations/narrowsidebar~NarrowSidebar} and
 * {@link module:comments/annotations/widesidebar~WideSidebar} that operates on the same sidebar). They cannot be activated at the same
 * time.
 * * It is not possible to display the same annotation in two different annotations UIs. In this scenario an error will be thrown.
 */
export default class AnnotationsUIs extends ContextPlugin {
    /**
     * A set of names of the active annotations UIs.
     *
     * To activate the annotations UI, use {@link module:comments/annotations/annotationsuis~AnnotationsUIs#activate}
     * or {@link #switchTo} methods.
     */
    activeUIs: Set<string>;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Annotations];
    /**
     * @inheritDoc
     */
    static get pluginName(): "AnnotationsUIs";
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
     * Returns `true` if at least one registered UI is active.
     */
    hasActive(): boolean;
    /**
     * Returns `true` if the given UI is active.
     */
    isActive(uiName: string): boolean;
    /**
     * Activates an annotations UI.
     *
     * Note that the custom annotations UI should be {@link #register registered} before the activation.
     *
     * The `filter` parameter can be used to display on some of the annotations in the given annotations UI. Thanks to that,
     * all annotations can be split into various annotations UIs.
     *
     * The `filter` function takes an {@link module:comments/annotations/annotation~Annotation} instance as the first and only parameter,
     * and should return `true` if that annotation should be placed in the given annotations UI.
     *
     * @param uiName The name of the annotations UI to activate.
     * @param filter The annotation filter function. If not specified, the UI will use all annotations.
     */
    activate(uiName: string, filter?: (annotation: Annotation) => boolean): void;
    /**
     * Deactivates annotations UI with given name.
     *
     * @param uiName The name of the annotations UI to deactivate.
     */
    deactivate(uiName: string): void;
    /**
     * Switches the annotations UI to the one with given name.
     *
     * It preserves the currently active annotation.
     *
     * @param uiName The name of the annotations UI to switch to.
     */
    switchTo(uiName: string): void;
    /**
     * Deactivates all annotations UIs.
     */
    deactivateAll(): void;
    /**
     * Registers an annotations UI. It might be one of:
     *
     * * {@link module:comments/annotations/widesidebar~WideSidebar},
     * * {@link module:comments/annotations/narrowsidebar~NarrowSidebar},
     * * {@link module:comments/annotations/inlineannotations~InlineAnnotations}.
     *
     * It is possible to provide your own, custom annotations UI plugin. It has to implement
     * {@link module:comments/annotations/annotationsuis~AnnotationsUI the `AnnotationsUI` interface}.
     *
     * @param uiName Annotations UI name.
     * @param annotationsUI Annotations UI plugin instance.
     */
    register(uiName: string, annotationsUI: AnnotationsUI<ContextPlugin | Plugin>): void;
    /**
     * Refilters annotations to proper UIs based on filters provided earlier during the
     * {@link module:comments/annotations/annotationsuis~AnnotationsUIs#activate annotations UIs activation}.
     *
     * This method should be used if the annotations UIs filtering functions return different results than before
     * for some annotations. It only reattaches these annotations, which should change their UIs.
     */
    refilterAnnotations(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * A default pass-by filter function that returns `true` for all annotations to be used when no filter for UI is provided.
     */
    defaultFilter(): boolean;
}
/**
 * An interface for the annotations UI plugin class.
 *
 * The annotations UI class handles displaying, focusing, activating and hiding annotations views.
 *
 * The annotations UI class must be a plugin, so it has to extend the {@link module:core/plugin~Plugin} or
 * {@link module:core/contextplugin~ContextPlugin} class.
 *
 * Examples of `AnnotationsUI` are:
 *
 * * {@link module:comments/annotations/widesidebar~WideSidebar},
 * * {@link module:comments/annotations/narrowsidebar~NarrowSidebar},
 * * {@link module:comments/annotations/inlineannotations~InlineAnnotations}.
 *
 * You can use the following snippet as a base for your own annotations UI:
 *
 * ```ts
 * class MyAnnotationsUI extends ContextPlugin {
 * 	constructor( ...args ) {
 * 		super( ...args );
 *
 * 		this.set( 'activeAnnotation', null );
 * 	}
 *
 * 	attach( annotations ) {
 * 		// Do something when an annotation is added.
 * 		this.listenTo( annotations, 'add', ( evt, annotation ) => { ... } );
 *
 * 		// Do something when an annotation is removed.
 * 		this.listenTo( annotations, 'remove', ( evt, annotation ) => { ... } );
 * 	}
 *
 * 	detach() {
 * 		this.stopListening();
 * 	}
 *
 * 	setActiveAnnotation( annotation ) {
 * 		if ( this.activeAnnotation ) {
 * 			this.activeAnnotation.isActive = false;
 *
 * 			// You can do something in your UI with the annotation that is no longer active.
 * 		}
 *
 * 		this.activeAnnotation = annotation;
 * 		this.activeAnnotation.isActive = true;
 *
 * 		// You can do something in your UI to highlight the active annotation.
 * 	}
 * }
 * ```
 */
export interface AnnotationUI {
    /**
     * Observable `activeAnnotation` property. {@link module:comments/annotations/annotationsuis~AnnotationsUIs} listens to changes on that
     * property.
     *
     * To make this property observable use `this.set( 'activeAnnotation', null )` in the constructor.
     */
    activeAnnotation: Annotation | null;
    /**
     * Creates everything needed for the UI and attaches all listeners. This method is called when the UI is activated.
     *
     * The observable collection of annotations is passed as the first argument,
     * and the annotations UI is responsible for reacting to its changes.
     */
    attach: (annotationCollection: AnnotationCollection) => void;
    /**
     * Destroys the UI and removes all listeners. This method is called when the UI is deactivated.
     */
    detach: () => void;
    /**
     * Sets or unsets the active annotation. This method is called when an annotation is activated, for example, user puts their
     * selection into a marker connected with given annotation.
     *
     * This method should change the UI so the new active annotation is differentiated from other annotations.
     *
     * This method should set the
     * {@link #activeAnnotation `AnnotationUI#activeAnnotation`} property.
     *
     * It also should set {@link module:comments/annotations/annotation~Annotation#isActive `Annotation#isActive`} of the deactivated
     * and the activated annotation.
     *
     * @param annotation The new active annotation or null when no annotation is active.
     */
    setActiveAnnotation: (annotation: Annotation | null) => void;
    _setSelectedAnnotations?: (annotations: Array<Annotation>) => void;
}
export type AnnotationsUI<T extends Emitter> = T & AnnotationUI;
