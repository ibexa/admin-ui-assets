/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { User } from 'ckeditor5-collaboration/src/collaboration-core.js';
declare const Revision_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Represents a revision.
 */
export default class Revision extends /* #__PURE__ -- @preserve */ Revision_base {
    /**
     * Unique revision id.
     */
    id: string;
    /**
     * The user who created the revision.
     *
     * The `null` value means the revision was created automatically.
     */
    creator: User | null;
    /**
     * All users who contributed to this revision.
     *
     * This value can be empty if there are no changes in the revision.
     */
    authors: Array<User>;
    /**
     * Contains data describing changes saved in this revision.
     *
     * An object, where the keys are the names of roots and the values are strings with the revision data for those roots.
     */
    diffData: any;
    /**
     * Document version at which the revision ends.
     *
     * The revision includes changes introduced by {@link module:engine/model/operation/operation~Operation operations}
     * with base versions starting from {@link module:revision-history/revision~Revision#fromVersion `fromVersion`} (inclusive) up to
     * {@link module:revision-history/revision~Revision#toVersion `toVersion`} (exclusive).
     */
    toVersion: number;
    /**
     * Document version from which the revision starts.
     *
     * The revision includes changes introduced by {@link module:engine/model/operation/operation~Operation operations}
     * with base versions starting from {@link module:revision-history/revision~Revision#fromVersion `fromVersion`} (inclusive) up to
     * {@link module:revision-history/revision~Revision#toVersion `toVersion`} (exclusive).
     */
    fromVersion: number;
    /**
     * The revision name.
     *
     * If revision has not been named yet, this is an empty string.
     *
     * @observable
     */
    name: string;
    /**
     * The date when the revision was created or most recently updated.
     *
     * @observable
     */
    createdAt: Date;
    /**
     * Revision custom attributes. See also {@link #setAttribute} and {@link #removeAttribute}.
     *
     * @observable
     */
    attributes: Record<string, unknown>;
    constructor(data: RevisionData);
    /**
     * Sets the revision name.
     */
    setName(name: string): void;
    /**
     * Adds revision attribute.
     *
     * Revision attributes are custom data that can be set and used by features built around revisions.
     * Use it to store your feature data together with other revision data.
     *
     * ```ts
     * revision.setAttribute( 'isImportant', true );
     * ```
     *
     * You can group multiple values in an object, using the dot notation:
     *
     * ```ts
     * revision.setAttribute( 'customData.type', 'image' );
     * revision.setAttribute( 'customData.src', 'foo.jpg' );
     * ```
     *
     * The attributes set on the revision can be accessed through the `attribute` property:
     *
     * ```ts
     * const isImportant = revision.attributes.isImportant;
     * const type = revision.attributes.customData.type;
     * ```
     *
     * You can also observe the `attributes` property or bind other properties to it:
     *
     * ```ts
     * myObj.bind( 'customData' ).to( revision, 'attributes', attributes => attributes.customData );
     * revision.on( 'change:attributes', ( evt, propName, newValue, oldValue ) => { ... } );
     * ```
     *
     * Whenever `setAttribute()` or `removeAttribute()` is called, the `attributes` property
     * is re-set and the observables are refreshed.
     */
    setAttribute(name: string, value: unknown): void;
    /**
     * Removes the revision attribute.
     *
     * See also {@link #setAttribute}
     */
    removeAttribute(name: string): void;
    toJSON(): RevisionJSON;
}
/**
 * @eventName _update
 */
export interface RevisionUpdateEvent {
    name: '_update';
    args: [RevisionJSON, boolean];
}
export interface RevisionJSON {
    id: string;
    name: string;
    creatorId: string | null;
    authorsIds: Array<string>;
    diffData: any;
    createdAt: Date;
    attributes: Record<string, unknown>;
    fromVersion: number;
    toVersion: number;
}
export interface RevisionData {
    id?: string;
    name?: string | null;
    creator?: User | null;
    creatorId?: string | null;
    authors?: Array<User>;
    authorsIds?: Array<string>;
    diffData?: any;
    data?: any;
    createdAt?: Date;
    attributes?: Record<string, unknown>;
    fromVersion?: number;
    toVersion?: number;
    isEmptyCurrent?: boolean;
}
export {};
