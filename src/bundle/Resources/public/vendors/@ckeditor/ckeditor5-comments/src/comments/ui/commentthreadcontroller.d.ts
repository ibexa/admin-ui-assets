/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { CommentThread } from '../commentsrepository.js';
import type { default as BaseCommentThreadView } from './view/basecommentthreadview.js';
declare const CommentThreadController_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * Controller for a comment thread.
 *
 * It takes a comment thread view, listens to events fired by that view and based on them performs actions on a comment thread model.
 */
export default class CommentThreadController extends /* #__PURE__ -- @preserve */ CommentThreadController_base {
    model: CommentThread;
    view: BaseCommentThreadView;
    /**
     * @param model Comment thread model.
     * @param view Comment thread view.
     */
    constructor(model: CommentThread, view: BaseCommentThreadView);
    /**
     * Submits the comment thread.
     */
    submit(): void;
    /**
     * Removes the comment thread.
     */
    remove(): void;
    /**
     * Resolves the comment thread.
     */
    resolve(): void;
    /**
     * Reopens the comment thread.
     */
    reopen(): void;
    /**
     * Adds a comment to the comment thread.
     *
     * @param commentContent Comment content.
     */
    addComment(commentContent: string): void;
    /**
     * Updates a comment that belongs to the comment thread.
     *
     * @param commentId Id of the comment to update.
     * @param commentContent Updated comment content.
     */
    updateComment(commentId: string, commentContent: string): void;
    /**
     * Removes a comment from the comment thread.
     *
     * @param commentId Id of the comment to remove.
     */
    removeComment(commentId: string): void;
    /**
     * Destroys `CommentThreadController` instance.
     */
    destroy(): void;
}
export {};
