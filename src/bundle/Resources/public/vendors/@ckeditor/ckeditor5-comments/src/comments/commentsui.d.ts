/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/commentsui
 */
import { Plugin } from 'ckeditor5/src/core.js';
import CommentsRepository from './commentsrepository.js';
import CommentsEditing from './commentsediting.js';
import EditorAnnotations from '../annotations/editorannotations.js';
import Annotations from '../annotations/annotations.js';
/**
 * Creates `comment` {@link module:ui/button/buttonview~ButtonView ui button} and binds with
 * {@link module:comments/comments/addcommentthreadcommand~AddCommentThreadCommand}.
 *
 * Because of CommentsRepository handles UI of CommentThreads responsibility of this plugin is limited to
 * adjusting comments UX for the editor purpose.
 */
export default class CommentsUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsUI";
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
    static get requires(): readonly [typeof CommentsRepository, typeof CommentsEditing, typeof EditorAnnotations, typeof Annotations];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
