/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/commentsediting
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import type { Marker } from 'ckeditor5/src/engine.js';
import CommentsRepository from './commentsrepository.js';
import { Users } from 'ckeditor5-collaboration/src/collaboration-core.js';
import EditorAnnotations from '../annotations/editorannotations.js';
import CommentsRestrictedEditingMode from './integrations/commentsrestrictededitingmode.js';
import CommentsImportWord from './integrations/importword.js';
import CommentsClipboard from './integrations/clipboard.js';
import ShowCommentHighlights from './integrations/showcommenthighlights.js';
import '../../theme/commentmarker.css';
/**
 * Plugin that keeps in sync comments in {@link module:comments/comments/commentsrepository~CommentsRepository} with
 * {@link module:engine/model/markercollection~Marker comment markers}.
 */
export default class CommentsEditing extends Plugin {
    /**
     * If set to `true`, the plugin won't load comment thread for the new marker immediately after the marker is added to the editor.
     * Instead, the plugin will wait until the flag will be set to `false` and then load missing comments.
     *
     * It's useful to hold fetching comments from the server when comments are used with real-time collaboration.
     * When a user connects to an existing document, the operations from the history need to be applied one by one.
     * An operation which added a new comment marker might be followed by an operation which removes that marker, so it's not
     * necessary to make an additional request then.
     *
     * @observable
     */
    isThreadsLoadingPaused: boolean;
    /**
     * Name of the active comment marker.
     *
     * Markers conversion checks if comment should be marked as active and adds/removes additional css class during the conversion.
     *
     * @observable
     */
    activeMarker: string | null;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof CommentsRepository, typeof EditorAnnotations, typeof Users, typeof CommentsRestrictedEditingMode, typeof CommentsImportWord, typeof CommentsClipboard, typeof ShowCommentHighlights];
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsEditing";
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
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Returns `true` if there is at least one marker in the content that is related to a comment thread with given `threadId`.
     *
     * @param threadId Comment thread id.
     */
    hasMarkerForId(threadId: string): boolean;
    /**
     * Returns all markers that are related to the comment thread with the given `threadId`.
     *
     * @param threadId Comment thread id.
     * @returns Array with all markers related to given comment thread.
     */
    getAllMarkersForId(threadId: string): Array<Marker>;
    /**
     * Scrolls editing view to the first thread marker.
     *
     * @param threadId Comment thread id.
     */
    scrollToThreadMarker(threadId: string): void;
}
/**
 * Returns marker name split to group and id.
 */
export declare function splitMarkerName(name: string): {
    group: string;
    id: string;
    part: string;
};
