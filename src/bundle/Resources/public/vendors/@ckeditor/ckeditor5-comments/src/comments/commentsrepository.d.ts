/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/commentsrepository
 * @publicApi
 */
import { PendingActions, ContextPlugin, Editor, type Context } from 'ckeditor5/src/core.js';
import { Collection } from 'ckeditor5/src/utils.js';
import { Users, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
import CommentThreadController from './ui/commentthreadcontroller.js';
import '../../theme/comment.css';
import '../../theme/commentthread.css';
import '../../theme/commentinput.css';
import Annotation, { type AnnotationTarget } from '../annotations/annotation.js';
import Annotations from '../annotations/annotations.js';
import type { default as BaseCommentThreadView } from './ui/view/basecommentthreadview.js';
/**
 * Stores the list of {@link module:comments/comments/commentsrepository~CommentThread}
 * and provides event-driven API for managing them. It is also responsible for using the comments adapter
 * to communicate with the data source.
 *
 * {@link module:comments/comments/commentsrepository~CommentsRepository} is a context plugin.
 * It can be added to a context or to an editor. Add it to the context configuration if you use
 * {@link module:core/context~Context} in your integration.
 *
 * The event-driven API makes it possible to attach a listener to each action that changes comment data.
 * Using different event priorities allows to attach an action before the main action ('low' priority)
 * or after the main action ('high' priority). It works very similar to
 * {@link module:utils/observablemixin~Observable#decorate}.
 *
 * Sample usage:
 *
 * ```ts
 * // Get the comments repository:
 * const commentsRepository = editor.plugins.get( 'CommentsRepository' );
 *
 * // Create a new, empty comment thread on a DOM form field element:
 * commentsRepository.openNewCommentThread( { channelId, target: formFieldElement } );
 *
 * // Get all comment threads:
 * commentsRepository.getCommentThreads();
 *
 * // Set the adapter:
 * commentsRepository.adapter = {
 * 	// ...
 * };
 * ```
 *
 * For more information about the comments adapter see {@link module:comments/comments/commentsrepository~CommentsAdapter}.
 */
export default class CommentsRepository extends ContextPlugin {
    /**
     * The currently active comment thread.
     * An annotation with this thread will be marked as active.
     *
     * @observable
     */
    activeCommentThread: CommentThread | null;
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Annotations, typeof PendingActions, typeof Users];
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsRepository";
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
     * An adapter object that should communicate with the data source to fetch or save the comments data.
     */
    set adapter(adapter: CommentsAdapter);
    get adapter(): CommentsAdapter;
    /**
     * Adds a new comment thread.
     *
     * When a target is provided, the comment annotation will be attached to this target.
     *
     * Use this method to load the comments data during the editor initialization
     * if you do not use the adapter integration.
     *
     * **Note:** This method fires the {@link #event:addCommentThread} event and the default behavior
     * is added as a `'normal'` priority listener. It makes it possible to cancel the method
     * or call some custom code before or after the default behavior is executed.
     *
     * **Note:** The comments adapter will send the data only if `commentThreadData.comments`
     * is not empty and `commentThreadData.isFromAdapter` is set to `false`.
     *
     * See also `CommentsRepository#openNewCommentThread()`.
     *
     * An example of loading a comment thread on editor initialization:
     *
     * ```ts
     * commentsRepository.addCommentThread( {
     * 	threadId: 'thread-id',
     * 	channelId: 'channel-id',
     * 	comments: [
     * 		{
     * 			commentId: 'comment-1',      // String
     * 			authorId: 'author-id',       // String
     * 			content: 'First comment',    // String
     * 			createdAt: new Date( ... )   // Date instance
     * 		},
     * 		// ...
     * 	],
     * 	target: () => ...,
     * 	// Added during initialization, so do not call the adapter:
     * 	isFromAdapter: true
     * } );
     * ```
     *
     * @fires addCommentThread
     * @param commentThreadData The data of the comment thread to add.
     * @param data.channelId The ID of a document or context to which the comment thread is added.
     * @param data.threadId The ID of the added comment thread.
     * @param data.comments Comments in the comment thread. See the example above.
     * @param data.unlinkedAt The date when the content related to the comment thread was lost (usually, the commented content was
     * removed from the document).
     * @param data.resolvedAt The date when the comment thread has been resolved.
     * @param data.resolvedBy The ID of user who resolved the comment thread.
     * @param data.target The target that the comment
     * balloon should be attached to. If a function is passed, it should return a DOM element or `Rect`.
     * @param data.context The text on which the comment thread was created on or similar contextual information for the comment thread.
     * To be displayed as an additional hint for archived comment threads.
     * @param data.attributes Custom comment attributes. See also
     * {@link module:comments/comments/commentsrepository~CommentThread#setAttribute} and
     * {@link module:comments/comments/commentsrepository~CommentThread#removeAttribute}.
     * @param data.isResolvable Indicates whether the comment thread can become resolved.
     * Set this flag to `false` to disable the possibility of resolving given comment thread.
     * @param data.isSubmitted Indicates whether the comment thread has been submitted.
     * Comment thread is submitted after adding the first comment, however, in some cases,
     * it could be necessary to manage it in a custom way (e.g. track changes).
     * @param data.isFromAdapter A flag describing whether the added data
     * comes from an adapter (`true`) or is a new data (`false`). If set to `true`, the
     * comment data will be added only in the editor and will not be sent to the adapter.
     * @returns The added comment thread.
     */
    addCommentThread({ channelId, threadId, comments, unlinkedAt, resolvedAt, resolvedBy, target, context, attributes, isResolvable, isSubmitted, isFromAdapter }?: Partial<AddCommentThreadEventData>): CommentThread | undefined;
    /**
     * Creates a new, empty comment thread.
     *
     * Displays a new comment annotation attached to the target and focuses the comment editor.
     * When the comment data is submitted, the comment thread is added to the editor
     * and sent to the adapter.
     *
     * Use this method to start a new comment thread after a user performed an action
     * (clicked a button, etc.).
     *
     * @fires addCommentThread
     * @param commentThreadData.channelId The ID of a document or context to which the comment is added.
     * @param commentThreadData.threadId The ID of the comment thread.
     * Random id will be generated if it is not set. All thread IDs should be unique.
     * @param commentThreadData.target The target that the comment
     * balloon should be attached to. If a function is passed, it should return a DOM element or `Rect`.
     * @param commentThreadData.context The text on which the comment thread was created on.
     * @param commentThreadData.isResolvable Indicates whether the comment thread can become resolved.
     * Set this flag to `false` to disable the possibility of resolving given comment thread.
     * @returns The created comment thread or `null` if there was a problem
     * creating the thread (for example, if the comments repository was in the read-only mode).
     */
    openNewCommentThread({ channelId, threadId, target, context, isResolvable }: AddCommentThreadEventData): CommentThread | null;
    /**
     * Checks if a comment thread with a given ID is added to the repository.
     */
    hasCommentThread(threadId: string): boolean;
    /**
     * Updates existing comment thread.
     *
     * @fires updateCommentThread
     * @param data The data of the comment thread to add.
     * @param data.channelId The ID of a document or context to which the comment thread is added.
     * @param data.threadId The ID of the updated comment thread.
     * @param data.unlinkedAt The date when the content related to the comment thread was lost (usually, the commented content was
     * removed from the document).
     * @param data.context The text on which the comment thread was created on or similar contextual information for the comment thread.
     * To be displayed as an additional hint for archived comment threads.
     * @param data.attributes Custom comment attributes. See also
     * {@link module:comments/comments/commentsrepository~CommentThread#setAttribute} and
     * {@link module:comments/comments/commentsrepository~CommentThread#removeAttribute}.
     * @param data.isFromAdapter A flag describing whether the added data
     * comes from an adapter (`true`) or is a new data (`false`). If set to `true`, the
     * comment data will be added only in the editor and will not be sent to the adapter.
     * @returns The updated comment thread.
     */
    updateCommentThread({ channelId, threadId, context, unlinkedAt, attributes, isFromAdapter }: UpdateCommentThreadEventData): CommentThread;
    /**
     * Returns comment thread of given id.
     */
    getCommentThread(threadId: string): CommentThread | undefined;
    /**
     * Gets the comment thread data using the adapter and adds the thread to the editor.
     *
     * When the comment thread is already present in the repository,
     * then the adapter will not be used but the result will be asynchronous as well.
     */
    fetchCommentThread({ channelId, threadId }?: BaseCommentThread): Promise<CommentThread | undefined>;
    getCommentThreads(data?: {
        channelId?: string | symbol;
        skipNotAttached?: boolean;
        skipEmpty?: boolean;
        toJSON?: false;
    }): Array<CommentThread>;
    getCommentThreads(data: {
        channelId?: string | symbol;
        skipNotAttached?: boolean;
        skipEmpty?: boolean;
        toJSON: true;
    }): Array<CommentThreadDataJSON>;
    /**
     * Marks a comment thread with the given ID as active.
     * When `threadId` is `null`, the currently active comment thread will be deactivated.
     */
    setActiveCommentThread(threadId: string | null): void;
    /**
     * Changes the read-only state for comment threads.
     *
     * When the value is `true` then all comment threads will be switched to read-only,
     * when the value is `false` then all comment threads will be switched to editing mode.
     *
     * Optionally new state can be applied to a comment threads limited to a given channel.
     * This function has precedence over any permission settings.
     */
    switchReadOnly(value: boolean, channelId?: string | symbol): void;
    /**
     * Returns `true` if a given channel is set to read-only mode, returns `false` otherwise.
     */
    isReadOnly(channelId: string | symbol): boolean;
    /**
     * Create an instance of the {@link module:comments/comments/ui/commentthreadcontroller~CommentThreadController} class.
     *
     * @param commentThreadModel Comment thread model.
     * @param commentThreadView Comment thread view.
     */
    createCommentThreadController(commentThreadModel: CommentThread, commentThreadView: BaseCommentThreadView): CommentThreadController;
    /**
     * Gets permissions set for repository (or default if permissions was not set).
     */
    getPermissions(channelId?: string | symbol): CommentPermissionsConfig;
}
interface CommentPermissionsConfig {
    /**
     * Allows for removing other users' threads.
     */
    admin: boolean;
    /**
     * Allows for editing and removing any comments created by other users.
     */
    modifyAll: boolean;
    /**
     * Allows for adding new comments as well as editing and removing comments created by this user.
     */
    write: boolean;
    /**
     * Allows for resolving and reopening comment threads.
     */
    resolve: boolean;
}
declare const CommentThread_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Comment thread representation.
 * Stores a list of {@link module:comments/comments/commentsrepository~Comment `Comments`}.
 */
export declare class CommentThread extends /* #__PURE__ -- @preserve */ CommentThread_base {
    /**
     * Informs if the comment thread is in read-only state (`true`) or not (`false`).
     *
     * @observable
     */
    isReadOnly: boolean;
    /**
     * Informs if the comment thread can be removed by the local user.
     *
     * @observable
     */
    isRemovable: boolean;
    /**
     * Informs if a user has permission to add a new comment to the comment thread.
     *
     * @observable
     */
    canComment: boolean;
    /**
     * Date when the comment thread has been archived.
     *
     * Comment threads become archived after they are {@link #resolvedAt resolved} or {@link #unlinkedAt unlinked}.
     * If the comment thread is resolved and/or unlinked, this value is set to the earliest of the dates. Otherwise, it is `null`.
     *
     * @observable
     */
    archivedAt: Date | null;
    /**
     * The date when the content related to the comment thread was lost (usually, the commented content was removed from the document).
     *
     * @observable
     */
    unlinkedAt: Date | null;
    /**
     * User id which resolved the comment thread.
     *
     * @observable
     */
    resolvedBy: User | null;
    /**
     * Date when the comment thread has been resolved.
     *
     * @observable
     */
    resolvedAt: Date | null;
    /**
     * Informs if the comment thread is resolved.
     *
     * @observable
     */
    readonly isResolved: boolean;
    /**
     * Custom comment thread attributes. See also {@link #setAttribute} and {@link #removeAttribute}.
     *
     * @observable
     */
    attributes: Record<string, unknown>;
    /**
     * The channel where the comment thread was created.
     */
    channelId: string | symbol;
    /**
     * The comment thread ID.
     */
    id: string;
    /**
     * A collection of {@link module:comments/comments/commentsrepository~Comment}s belonging to this thread.
     *
     * @readonly
     */
    readonly comments: Collection<Comment>;
    constructor(commentsRepository: CommentsRepository, data: {
        channelId: string | symbol;
        id: string;
        context: CommentThreadContext;
        attributes: Record<string, unknown>;
        unlinkedAt: Date | null;
        resolvedAt: Date | null;
        resolvedBy: User | null;
        isResolvable: boolean;
        isSubmitted: boolean;
    });
    /**
     * Sum of {@link module:comments/comments/commentsrepository~Comment#weight weights of all comments} in this thread.
     */
    get weight(): number;
    /**
     * The number of {@link module:comments/comments/commentsrepository~Comment comments} in the comment thread.
     */
    get length(): number;
    /**
     * Informs if the comment thread is attached to any target at the moment.
     */
    get isAttached(): boolean;
    /**
     * Informs if the comment thread has been submitted.
     */
    get isSubmitted(): boolean;
    /**
     * Submits the locally created comment thread draft.
     */
    submit(): void;
    /**
     * Updates the unlinked date.
     */
    setUnlinkedAt(unlinkedAt: Date | null): void;
    /**
     * Resolves the comment thread.
     */
    resolve({ resolvedAt, resolvedBy, isFromAdapter }?: {
        resolvedAt?: Date | undefined;
        resolvedBy?: null | undefined;
        isFromAdapter?: boolean | undefined;
    }): void;
    /**
     * Reopens the resolved comment thread.
     */
    reopen({ isFromAdapter }?: {
        isFromAdapter?: boolean | undefined;
    }): void;
    /**
     * Set the context on the comment thread.
     * This method should be called only when the context has been not set during initialization.
     *
     * @param context Text context of comment thread.
     */
    setContext(context: CommentThreadContext): void;
    /**
     * Adds attribute to the comment thread.
     *
     * Comment thread attributes are custom data that can be set and used by features
     * built around comments. Use it to store your feature data with other comment thread data.
     * You can also group multiple values in an object, using dot notation:
     *
     * ```ts
     * 	commentThread.setAttribute( 'customData.isImportant', true );
     * ```
     *
     * Attributes set on the comment can be accessed through the `attribute` property:
     *
     * ```ts
     * 	const isImportant = commentThread.attributes.customData.isImportant;
     * ```
     *
     * You can also observe the `attributes` property or bind other properties to it:
     *
     * ```ts
     * 	myObj.bind( 'customData' ).to( commentThread, 'attributes', attributes => attributes.customData );
     * ```
     *
     * Whenever `setAttribute()` or `removeAttribute()` is called, the `attributes` property
     * is re-set and observables are refreshed.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:updateCommentThread
     * @param name Attribute name.
     * @param value Attribute value.
     */
    setAttribute(name: string, value: unknown): void;
    /**
     * Removes a comment attribute.
     *
     * See also {@link module:comments/comments/commentsrepository~CommentThread#setAttribute}.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:updateCommentThread
     * @param name The attribute name.
     */
    removeAttribute(name: string): void;
    /**
     * Removes comment thread.
     *
     * **Note** This method is event-driven. It means it fires an event then a normal priority listener catches
     * it and executes an action. It makes it possible to add some actions before and after method will be executed.
     *
     * @fires module:comments/comments/commentsrepository~RemoveCommentThreadEvent
     */
    remove({ isFromAdapter }?: {
        isFromAdapter?: boolean | undefined;
    }): void;
    /**
     * Creates comment annotations and displays it attached to the given target.
     *
     * @returns Created annotation.
     */
    attachTo(target: AnnotationTarget): Annotation;
    /**
     * Creates a new comment inside the comment thread.
     *
     * **Note** This method is event-driven. It means it fires an event then a normal priority listener catches
     * it and executes an action. It makes it possible to add some actions before and after method will be executed.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:addComment
     * @param data Data object.
     * @param data.commentId Comment id.
     * @param data.content Comment content.
     * @param data.authorId Author id.
     * @param data.createdAt Creation date. If not set, current date (`new Date()`) will be used.
     * @param data.attributes Custom comment attributes. See also
     * {@link module:comments/comments/commentsrepository~Comment#setAttribute} and
     * {@link module:comments/comments/commentsrepository~Comment#removeAttribute}.
     */
    addComment(data: CommentData): void;
    /**
     * Returns comment of given id.
     */
    getComment(commentId: string): Comment | null;
    toJSON(): CommentThreadDataJSON;
}
declare const Comment_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Single comment representation. A part of a {@link module:comments/comments/commentsrepository~CommentThread commentThread}.
 */
export declare class Comment extends /* #__PURE__ -- @preserve */ Comment_base {
    /**
     * When is set to `true`, editing the comment is blocked.
     *
     * @observable
     */
    readonly isEditable: boolean;
    /**
     * When is set to `false`, removing the comment is blocked.
     *
     * @observable
     */
    readonly isRemovable: boolean;
    /**
     * The read-only state inherited from the parent {@link module:comments/comments/commentsrepository~CommentThread}.
     * When is set to `true`, then removing and editing the comment thread is blocked.
     *
     * In contrast to {@link #isEditable} and {@link #isRemovable}, this state can be used to
     * hide some UI parts instead of temporarily disabling them.
     *
     * @observable
     */
    readonly isReadOnly: boolean;
    /**
     * The comment content.
     */
    content: string;
    /**
     * Date when the comment was made.
     *
     * Usually the same as {@link #createdAt `createdAt`} but may be different in some cases
     * (e.g. when comment was added from an external source).
     *
     * @observable
     */
    authoredAt: Date;
    /**
     * The date when the comment thread was resolved or `null` if it is not resolved.
     *
     * @observable
     */
    resolvedAt: Date | null;
    /**
     * Custom comment attributes. See also {@link #setAttribute} and {@link #removeAttribute}.
     *
     * @observable
     */
    attributes: Record<string, any>;
    /**
     * The comment ID.
     */
    readonly id: string;
    /**
     * The ID of the comment thread that contains this comment.
     */
    readonly threadId: string;
    /**
     * The comment author.
     */
    readonly author: User;
    /**
     * The user which saved the comment data in the database.
     *
     * Usually the same as author but may be different in some cases (e.g. when comment was added from an external source).
     */
    readonly creator: User;
    /**
     * The flag indicating whether the comment comes from an external source.
     */
    readonly isExternal: boolean;
    /**
     * Date when the comment was saved in the database.
     */
    createdAt: Date;
    /**
     * @param commentsRepository
     * @param data Configuration object.
     * @param data.id Comment id.
     * @param data.threadId Comment thread id.
     * @param data.content Comment content.
     * @param data.author Comment author.
     * @param data.creator The user which saved the comment data.
     * Usually the same as author but may be different in some cases (e.g. when comment was added from an external source).
     * @param data.createdAt Date when the comment was saved in the database.
     * @param data.authoredAt Date when the comment was made.
     * @param data.attributes Custom comment attributes. See also
     * {@link module:comments/comments/commentsrepository~Comment#setAttribute} and
     * {@link module:comments/comments/commentsrepository~Comment#removeAttribute}.
     */
    constructor(commentsRepository: CommentsRepository, data: {
        id: string;
        threadId: string;
        content: string;
        author: User;
        creator: User;
        createdAt: Date;
        authoredAt: Date;
        attributes: Record<string, unknown>;
    });
    /**
     * The comment weight.
     *
     * It is equal to the length of the comment content, however it is never smaller than `200`.
     * This limit is set to avoid a long list of very short not collapsed comments.
     */
    get weight(): number;
    /**
     * Updates the comment with provided data.
     *
     * **Note:** This method fires the {@link module:comments/comments/commentsrepository~CommentsRepository#event:updateComment}
     * event and the default behavior is added as a normal priority listener. It makes it
     * possible to cancel the method or call some custom code before or after the default
     * behavior is executed.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:updateComment
     * @param data Data object.
     * @param data.content Comment content.
     * @param data.createdAt Creation date.
     * @param data.attributes Custom comment attributes. See also
     * {@link module:comments/comments/commentsrepository~Comment#setAttribute} and
     * {@link module:comments/comments/commentsrepository~Comment#removeAttribute}.
     * @param data.isFromAdapter
     */
    update(data: UpdateCommentData): void;
    /**
     * Adds attribute to the comment.
     *
     * Comment attributes are custom data that can be set and used by features
     * built around comments. Use it to store your feature data with other comment data.
     *
     *      comment.setAttribute( 'isImportant', true );
     *
     * You can group multiple values in an object, using dot notation:
     *
     *      comment.setAttribute( 'customData.type', 'image' );
     *      comment.setAttribute( 'customData.src', 'foo.jpg' );
     *
     * Attributes set on the comment can be accessed through the `attribute` property:
     *
     *      const isImportant = comment.attributes.isImportant;
     *      const type = comment.attributes.customData.type;
     *
     * You can also observe the `attributes` property or bind other properties to it:
     *
     *      myObj.bind( 'customData' ).to( comment, 'attributes', attributes => attributes.customData );
     *
     * Whenever `setAttribute()` or `removeAttribute()` is called, the `attributes` property
     * is re-set and observables are refreshed.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:updateComment
     * @param name Attribute name.
     * @param value Attribute value.
     */
    setAttribute(name: string, value: unknown): void;
    /**
     * Removes a comment attribute.
     *
     * See also {@link module:comments/comments/commentsrepository~Comment#setAttribute}.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:updateComment
     * @param name The attribute name.
     */
    removeAttribute(name: string): void;
    /**
     * Removes the comment.
     *
     * **Note:** This method fires the {@link module:comments/comments/commentsrepository~CommentsRepository#event:updateComment}
     * event and the default behavior is added as a normal priority listener. It makes it
     * possible to cancel the method or call some custom code before or after the default
     * behavior is executed.
     *
     * @fires module:comments/comments/commentsrepository~CommentsRepository#event:removeComment
     * @param data.isFromAdapter A flag describing whether the comment was
     * updated from an adapter (`true`) or from the UI (`false`). If set to `true`, the adapter will not be called.
     */
    remove(data?: {
        isFromAdapter?: boolean;
    }): void;
    toJSON(): CommentDataJSON;
    /**
     * Destroys the comment instance.
     */
    destroy(): void;
}
export type CommentThreadContext = null | {
    type: string;
    value: unknown;
};
/**
 * @param channelId The ID of a document or context that the comment thread is handled.
 * @param threadId The ID of the comment thread.
 * @param isFromAdapter A flag describing whether the operation was done on a remote client (`true`) or a local one (`false`).
 */
export interface BaseCommentThread {
    channelId: string | symbol;
    threadId: string;
    isFromAdapter?: boolean;
}
/**
 * @param commentId The comment ID.
 */
export interface BaseComment extends BaseCommentThread {
    commentId: string;
}
/**
 * @param content The comment content.
 * @param attributes Comment custom attributes.
 */
export interface BaseCommentData {
    content: string;
    attributes: Record<string, any>;
}
/**
 * Fired whenever a comment thread is added to the comments repository.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * ```ts
 * const channelId = 'foo';
 *
 * commentsRepository.on( `addCommentThread:${ channelId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#addCommentThread
 */
export type AddCommentThreadEvent = {
    name: string;
    args: [Required<AddCommentThreadEventData>];
};
/**
 * @param context The comment ID.
 * @param attributes Comment thread custom attributes.
 * @param resolvedAt ID of the comment author.
 * @param resolvedBy The comment creation date.
 */
export type CommentThreadData = BaseCommentThread & Partial<{
    context: CommentThreadContext;
    attributes: Record<string, any>;
    unlinkedAt: Date | null;
    resolvedAt: Date | null;
    resolvedBy: string | null;
}>;
/**
 * @param comments Comments in the comment thread.
 * @param target The target that the comment balloon should be attached to.
 */
export type AddCommentThreadEventData = CommentThreadData & {
    comments?: Array<CommentData>;
    target?: AnnotationTarget;
    isResolvable?: boolean;
    isSubmitted?: boolean;
};
/**
 * Fired whenever a new comment thread is submitted and occurs after creating the first comment.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * ```ts
 * const channelId = 'foo';
 *
 * commentsRepository.on( `submitCommentThread:${ channelId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#submitCommentThread
 */
export type SubmitCommentThreadEvent = {
    name: string;
    args: [BaseCommentThread];
};
/**
 * Fired whenever a comment thread is updated in comments repository.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * @eventName ~CommentsRepository#updateCommentThread
 */
export type UpdateCommentThreadEvent = {
    name: string;
    args: [UpdateCommentThreadEventData];
};
export type UpdateCommentThreadEventData = Omit<CommentThreadData, 'resolvedAt' | 'resolvedBy'>;
/**
 * Fired whenever a comment thread is resolved.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * ```ts
 * const channelId = 'foo';
 *
 * commentsRepository.on( `resolveCommentThread:${ channelId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#resolveCommentThread
 */
export type ResolveCommentThreadEvent = {
    name: string;
    args: [ResolveCommentThreadEventData];
};
export type ResolveCommentThreadEventData = BaseCommentThread & {
    resolvedAt: Date | null;
    resolvedBy: string | null;
};
/**
 * Fired whenever a comment thread is reopened.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * ```ts
 * const channelId = 'foo';
 *
 * commentsRepository.on( `reopenCommentThread:${ channelId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#reopenCommentThread
 */
export type ReopenCommentThreadEvent = {
    name: string;
    args: [BaseCommentThread];
};
/**
 * Fired whenever a comment thread is removed from the comments repository.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * ```ts
 * const channelId = 'foo';
 *
 * commentsRepository.on( `removeCommentThread:${ channelId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#removeCommentThread
 */
export type RemoveCommentThreadEvent = {
    name: string;
    args: [BaseCommentThread];
};
/**
 * Fired whenever a comment is added.
 *
 * The event name includes `channelId` so it is possible to listen only
 * on changes happening in the specified channel.
 *
 * It is also possible to listen to events from the given thread ID by appending `:[threadId]` part to the event name
 *
 * ```ts
 * const channelId = 'foo';
 * const threadId = '1234';
 *
 * commentsRepository.on( `addComment:${ channelId }:${ threadId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#addComment
 */
export type AddCommentEvent = {
    name: string;
    args: [CommentEventData];
};
/**
 * @param commentId The comment ID.
 * @param authorId ID of the comment author.
 * @param createdAt The comment creation date.
 * @param isFromAdapter A flag describing whether the comment was updated on a remote client (`true`) or a local one (`false`).
 */
export type CommentData = BaseCommentData & {
    commentId?: string;
    authorId: string;
    createdAt: Date;
    isFromAdapter?: boolean;
};
export type CommentEventData = BaseCommentThread & CommentData;
/**
 * Fired whenever a comment is updated.
 *
 * The event name includes `channelId` so it is possible to listen only
 * to changes happening in the specified channel.
 *
 * It is also possible to listen to events from the given thread ID by appending `:[threadId]` part to the event name
 *
 * ```ts
 * const channelId = 'foo';
 * const threadId = '1234';
 *
 * commentsRepository.on( `updateComment:${ channelId }:${ threadId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#updateComment
 */
export type UpdateCommentEvent = {
    name: string;
    args: [UpdateCommentEventData];
};
export type UpdateCommentData = Partial<CommentEventData>;
export type UpdateCommentEventData = UpdateCommentData & BaseComment;
/**
 * Fired whenever a comment is removed.
 *
 * The event name includes `channelId` so it is possible to listen only
 * to changes happening in the specified channel.
 *
 * It is also possible to listen to events from the given thread ID by appending `:[threadId]` part to the event name
 *
 * ```ts
 * const channelId = 'foo';
 * const threadId = '1234';
 *
 * commentsRepository.on( `removeComment:${ channelId }:${ threadId }`, ( evt, data ) => {
 * 	console.log( evt, data );
 * } );
 * ```
 *
 * @eventName ~CommentsRepository#removeComment
 */
export type RemoveCommentEvent = {
    name: string;
    args: [BaseComment];
};
export type CommentDataJSON = Omit<CommentData, 'isFromAdapter'>;
export type CommentThreadDataJSON = {
    threadId: string;
    context: CommentThreadContext;
    unlinkedAt: Date | null;
    resolvedAt: Date | null;
    resolvedBy: string | null;
    archivedAt: Date | null;
    comments: Array<CommentDataJSON>;
    attributes: Record<string, unknown>;
};
/**
 * Comments adapter.
 *
 * The comments adapter is an object that communicates asynchronously with the data source to fetch or save
 * the comment data. It is used internally by the comments feature whenever a comment is loaded, created or deleted.
 * The adapter is optional. You might need to provide it if you are {@glink features/collaboration/comments/comments-integration
 * using the comments feature without real-time collaboration}.
 * To set the adapter, overwrite the `CommentsRepository#adapter` property.
 */
export interface CommentsAdapter {
    /**
     * Called whenever a new comment thread is created.
     *
     * The object which is passed as a parameter can contain the following properties:
     * * channelId: string | symbol;
     * * threadId: string;
     * * context?: {@link module:comments/comments/commentsrepository~CommentThreadContext CommentThreadContext};
     * * comments?: Array<{@link module:comments/comments/commentsrepository~CommentDataJSON CommentDataJSON}>;
     * * resolvedAt?: Date | null;
     * * resolvedBy?: string | null;
     * * attributes?: Record<string, any> | null;
     *
     * It should return a promise that resolves with the new comment thread data.
     * The resolved data object should contain the following properties:
     * * threadId: string;
     * * comments: Array<\{ commentId: string; createdAt: Date; \}>;
     */
    addCommentThread: (data: Omit<CommentThreadData, 'isFromAdapter'> & {
        comments: Array<CommentDataJSON>;
    }) => Promise<{
        threadId: string;
        comments: Array<{
            commentId: string;
            createdAt: Date;
        }>;
    }>;
    /**
     * Called when the editor needs the data for a comment thread.
     *
     * It should return a promise that resolves with the comment thread data.
     * The resolved data object should contain the following properties:
     * * threadId: string;
     * * comments: Array<\{ commentId?: string; authorId: string; createdAt: Date; content: string; attributes: Record<string, any>; \}>;
     * * resolvedAt?: Date | null;
     * * resolvedBy?: string | null;
     * * attributes: Record<string, unknown>;
     *
     * @param data.channelId The ID of the document or context to which the comment is added.
     * @param data.threadId The ID of the comment thread that the comment is added to.
     */
    getCommentThread: (data: Omit<BaseCommentThread, 'isFromAdapter'>) => Promise<{
        threadId: string;
        comments: Array<CommentData>;
        resolvedAt?: Date | null;
        resolvedBy?: string | null;
        attributes: Record<string, unknown>;
    } | null>;
    /**
     * Called each time the user changes the existing comment thread.
     *
     * Keep in mind that for security reasons, the `authorId`, `createdAt`, `resolvedBy` and `resolvedAt` properties
     * are not passed in the `updateCommentThread()` call and you should not set them as a result of this call.
     *
     * It updates the comment data in the database and returns a promise
     * that will be resolved when the update is completed.
     *
     * The object which is passed as a parameter can contain the following properties:
     * * channelId: string | symbol;
     * * threadId: string;
     * * context?: {@link module:comments/comments/commentsrepository~CommentThreadContext};
     * * attributes?: Record<string, any> | null;
     */
    updateCommentThread: (data: Omit<UpdateCommentThreadEventData, 'isFromAdapter'>) => Promise<void>;
    /**
     * Called each time the user resolves a comment thread.
     *
     * Should set `resolvedAt` and `resolvedBy` properties in your database and should resolve with an object
     * containing these two properties and returns a promise that will be resolved when the operation is completed.
     *
     * The resolved data object should contain the following properties:
     * * threadId: string;
     * * resolvedAt: Date;
     * * resolvedBy: string;
     *
     * @param data.channelId The ID of the document or context that the comment thread is removed from.
     * @param data.threadId The ID of the thread to remove.
     */
    resolveCommentThread: (data: Omit<BaseCommentThread, 'isFromAdapter'>) => Promise<{
        threadId: string;
        resolvedAt: Date;
        resolvedBy: string;
    }>;
    /**
     * Called when the user reopens a resolved comment thread.
     *
     * Should set `resolvedAt` and `resolvedBy` properties to `null` in your database and returns a promise
     * that will be resolved when the operation is completed.
     *
     * @param data.channelId The ID of the document or context that the comment thread is removed from.
     * @param data.threadId The ID of the thread to remove.
     */
    reopenCommentThread: (data: Omit<BaseCommentThread, 'isFromAdapter'>) => Promise<void>;
    /**
     * Called each time the user removes a comment thread.
     *
     * It should return a promise that resolves when the thread is removed.
     *
     * @param data.channelId The ID of the document or context that the comment thread is removed from.
     * @param data.threadId The ID of the thread to remove.
     */
    removeCommentThread: (data: Omit<BaseCommentThread, 'isFromAdapter'>) => Promise<void>;
    /**
     * Called each time the user adds a new comment to a thread.
     *
     * It saves the comment data in the database and returns a promise
     * that should get resolved when the save is completed.
     *
     * If the promise resolves with an object with the `createdAt` property, the
     * comment property will be updated in the comment in the editor.
     * This is to update the comment data with the server-side information.
     *
     * The `data` object does not expect the `authorId` property.
     * For security reasons, the author of the comment should be set
     * on the server side.
     *
     * The `data` object does not expect the `createdAt` property either.
     * You should use the server-side time generator to ensure that all users
     * see the same date.
     *
     * It is recommended to stringify the `data.attributes` value to JSON
     * and to save it as a string in your database and then to parse the
     * value from JSON when loading comments.
     *
     * The object which is passed as a parameter can contain the following properties:
     * * channelId: string | symbol;
     * * threadId: string;
     * * commentId: string;
     * * content: string;
     * * attributes: Record<string, any>;
     *
     * The resolved data object should contain the following properties:
     * * commentId: string;
     * * createdAt: Date;
     *
     * @param data.channelId The ID of the document or context to which the comment is added.
     * @param data.threadId The ID of the comment thread that the comment is added to.
     * @param data.commentId The comment ID.
     * @param data.content The comment content.
     * @param data.attributes Comment custom attributes.
     */
    addComment: (data: Omit<BaseComment, 'isFromAdapter'> & BaseCommentData) => Promise<{
        commentId: string;
        createdAt: Date;
    }>;
    /**
     * Called each time the user changes the existing comment.
     *
     * It updates the comment data in the database and returns a promise
     * that will be resolved when the update is completed.
     *
     * Keep in mind that the `data` parameter only contains the
     * properties of a comment that have changed.
     *
     * The object which is passed as a parameter can contain the following properties:
     * * channelId: string | symbol;
     * * threadId: string;
     * * commentId: string;
     * * content?: string;
     * * attributes?: Record<string, any>;
     *
     * @param data.channelId The ID of the document or context where the comment is updated.
     * @param data.threadId The ID of the comment thread where the comment is updated.
     * @param data.commentId The ID of the comment to update.
     * @param data.content The new content of the comment.
     * @param data.attributes Custom comment attributes.
     */
    updateComment: (data: Omit<BaseComment, 'isFromAdapter'> & Partial<BaseCommentData>) => Promise<void>;
    /**
     * Called each time the user removes a comment from the thread.
     *
     * It removes the comment from the database and returns a promise
     * that will be resolved when the removal is completed.
     *
     * @param data.channelId The ID of the document or context that the comment is removed from.
     * @param data.threadId The ID of the comment thread that the comment is removed from.
     * @param data.commentId The ID of the comment to remove.
     */
    removeComment: (data: Omit<BaseComment, 'isFromAdapter'>) => Promise<void>;
}
export {};
