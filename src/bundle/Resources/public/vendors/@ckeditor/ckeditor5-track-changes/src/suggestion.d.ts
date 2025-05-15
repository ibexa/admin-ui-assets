/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/suggestion
 * @publicApi
 */
import { Element, type Marker, type Model, type Range, type Item } from 'ckeditor5/src/engine.js';
import type { User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import type { CommentThread } from '@ckeditor/ckeditor5-comments';
import type { FormatData, AttributeData } from './trackchangesediting.js';
declare const Suggestion_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Represents a singular suggestion that is tracked by track changes plugin.
 *
 * `Suggestion` instances are created and handled by {@link module:track-changes/trackchanges~TrackChanges track changes plugin}.
 */
export default class Suggestion extends /* #__PURE__ -- @preserve */ Suggestion_base {
    /**
     * Suggestion ID.
     */
    readonly id: string;
    /**
     * Suggestion type.
     */
    type: SuggestionType;
    /**
     * Suggestion sub-type.
     *
     * This is an additional identifier for suggestions. Two suggestions of the same type may have different sub-types to differentiate
     * suggestions behavior and handle interactions between suggestions.
     *
     * Sub-type is used for:
     *
     *  * suggestions joining (only suggestions with the same sub-type can be joined),
     *  * suggestions custom callbacks (fired when adding, deleting and joining suggestions).
     */
    subType: string | null;
    /**
     * The author of the change marked by the suggestion.
     */
    author: User;
    /**
     * The user which saved the suggestion data in the database.
     *
     * Usually the same as author but may be different in some cases (e.g. when suggestion was added from an external source).
     */
    creator: User;
    /**
     * The flag indicating whether the suggestion comes from an external source.
     */
    isExternal: boolean;
    /**
     * Additional suggestion data.
     */
    data: FormatData | AttributeData | null;
    /**
     * Date when the suggestion was saved in the database.
     */
    createdAt: Date | null;
    /**
     * Date when the change marked by the suggestion was made.
     *
     * Usually the same as {@link #createdAt `createdAt`} but may be different in some cases
     * (e.g. when suggestion was added from an external source).
     *
     * @observable
     */
    authoredAt: Date | null;
    /**
     * Custom suggestion attributes. See also {@link #setAttribute} and {@link #removeAttribute}.
     *
     * @observable
     */
    attributes: {
        [k: string]: unknown;
    };
    /**
     * Previous suggestion in suggestions chain.
     *
     * Chained suggestions should be handled as one entity.
     *
     * @observable
     */
    previous: Suggestion | null;
    /**
     * Next suggestion in suggestions chain.
     *
     * Chained suggestions should be handled as one entity.
     *
     * @observable
     */
    next: Suggestion | null;
    /**
     * Comment thread model for comments added to this suggestion.
     *
     * @observable
     */
    commentThread: CommentThread | null;
    constructor(model: Model, options: SuggestionOptions);
    /**
     * The first (most-previous) suggestion in this suggestion chain.
     */
    get head(): Suggestion;
    /**
     * Informs whether suggestion has at least one comment.
     */
    get hasComments(): boolean;
    /**
     * Informs whether the suggestion is a multi-range suggestion or a single-range suggestion.
     *
     * This is evaluated basing on the marker name belonging to this suggestion.
     * Even if only one marker belongs to the suggestion at a given time it can still be a multi range suggestion.
     */
    get isMultiRange(): boolean;
    /**
     * Informs whether the suggestion is still in the editor content.
     *
     * Returns `true` if there is at least one marker suggestion in the editor content.
     */
    get isInContent(): boolean;
    /**
     * Binds given marker name to this suggestion.
     */
    addMarkerName(markerName: string): void;
    /**
     * Returns all names of markers belonging to this suggestion.
     */
    getMarkerNames(): Array<string>;
    /**
     * Returns all markers belonging to this suggestion.
     */
    getMarkers(): Array<Marker>;
    /**
     * Returns the first marker belonging to this suggestion, i.e the first marker that was added to this suggestion
     * and not removed yet.
     *
     * This method is useful if you know that the suggestion has only one marker and want to process it.
     */
    getFirstMarker(): Marker | null;
    /**
     * Removes all markers from the suggestion and the editor content.
     */
    removeMarkers(): void;
    /**
     * Removes marker with the given name from the suggestion and the editor content.
     */
    removeMarker(markerName: string): void;
    /**
     * Adds a new range to this suggestion. It is assumed that the suggestion is a multi-range suggestion.
     *
     * A marker name is generated from this suggestion's properties and a marker with that name is created and set to a given `range`.
     */
    addRange(range: Range): void;
    /**
     * Checks if given `range` is intersecting with any of the ranges of markers belonging to this suggestion.
     */
    isIntersectingWithRange(range: Range): boolean;
    /**
     * Returns all ranges of all markers belonging to this suggestion.
     */
    getRanges(): Array<Range>;
    /**
     * Returns all {@link module:engine/model/item~Item model items} that are in this suggestion.
     */
    getItems(): Array<Item>;
    /**
     * Returns the first range belonging to this suggestion, i.e. the range of the first marker that was added to
     * this suggestion and not removed yet.
     *
     * This method is useful if you know that the suggestion has only one marker and want to process its range.
     */
    getFirstRange(): Range | null;
    /**
     * Returns the model element contained in the suggestion.
     *
     * A {@link module:engine/model/element~Element model element} is considered as contained if there is exactly
     * one range in the suggestion, and that range contains exactly one element.
     *
     * Returns `null` if there is no contained element.
     */
    getContainedElement(): Element | null;
    /**
     * Accepts the suggestion.
     */
    accept(): void;
    /**
     * Discards the suggestion.
     */
    discard(): void;
    /**
     * Returns all suggestions that are in this suggestion chain.
     */
    getAllAdjacentSuggestions(): Array<Suggestion>;
    /**
     * Adds suggestion attribute.
     *
     * Suggestion attributes are custom data that can be set and used by features
     * built around suggestions. Use it to store your feature data with other suggestion data.
     *
     * ```ts
     * suggestion.setAttribute( 'isImportant', true );
     * ```
     *
     * You can group multiple values in an object, using dot notation:
     *
     * ```ts
     * suggestion.setAttribute( 'customData.type', 'image' );
     * suggestion.setAttribute( 'customData.src', 'foo.jpg' );
     * ```
     *
     * Attributes set on the suggestion can be accessed through `attribute` property:
     *
     * ```ts
     * const isImportant = suggestion.attributes.isImportant;
     * const type = suggestion.attributes.customData.type;
     * ```
     *
     * You can also observe `attributes` property or bind other properties to it:
     *
     * ```ts
     * myObj.bind( 'customData' ).to( suggestion, 'attributes', attributes => attributes.customData );
     * ```
     *
     * Whenever `setAttribute()` or `removeAttribute()` is called, `attributes` property
     * is re-set and observables are refreshed.
     */
    setAttribute(name: string, value: unknown): void;
    /**
     * Removes suggestion attribute.
     *
     * See also {@link #setAttribute}
     */
    removeAttribute(name: string): void;
    toJSON(): SuggestionJSON;
    /**
     * Returns a random string that can be used as additional identifier for the marker name for suggestions that are multi range.
     */
    static getMultiRangeId(): string;
}
export interface SuggestionOptions {
    id: string;
    type: SuggestionType;
    subType: string | null;
    attributes: {
        [k: string]: unknown;
    };
    author: User;
    creator: User;
    onAccept: Function;
    onDiscard: Function;
    onAttributesChange: Function;
}
export interface SuggestionJSON {
    /**
     * Suggestion ID.
     */
    id: string;
    /**
     * Contains the information about the type and subtype of the suggestion.
     */
    type: string;
    /**
     * The ID of the author.
     */
    authorId: string;
    /**
     * Date when the suggestion was saved in the database.
     */
    createdAt: Date | null;
    /**
     * Informs whether suggestion has at least one comment.
     */
    hasComments?: boolean;
    /**
     * Additional suggestion data.
     */
    data?: FormatData | AttributeData | null;
    /**
     * Custom suggestion attributes.
     */
    attributes: {
        [k: string]: unknown;
    };
}
export type SuggestionType = 'insertion' | 'deletion' | 'formatInline' | 'formatBlock' | 'attribute';
export {};
