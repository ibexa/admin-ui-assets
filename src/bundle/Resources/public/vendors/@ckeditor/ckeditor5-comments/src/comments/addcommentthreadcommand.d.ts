/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/addcommentthreadcommand
 * @publicApi
 */
import { Command } from 'ckeditor5/src/core.js';
/**
 * Adds a new CommentMarker what automatically adds corresponding CommentThread to the CommentsEditing#threads collection.
 * Note this command adds only a CommentThread draft, to make is public marker has to be changed to be managed using operation.
 *
 * ```ts
 * // If `threadId` is not specified, `addCommentThread()` will generate a unique ID and use it:
 * editor.execute( 'addCommentThread' );
 *
 * // If you want to specify the exact thread ID, pass it through the optional `threadId` configuration parameter.
 * editor.execute( 'addCommentThread', { threadId: 'thread-1' } );
 * ```
 */
export default class AddCommentThreadCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @fires execute
     * @param options Options for executed command.
     * @param options.threadId Id of comment marker that will be added.
     */
    execute({ threadId }?: {
        threadId?: string | undefined;
    }): void;
}
