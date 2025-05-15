/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
export { default as Comments } from './comments.js';
export { default as CommentsOnly } from './commentsonly.js';
export { default as CommentsUI } from './comments/commentsui.js';
export { default as CommentsRepository, CommentThread, Comment, type CommentDataJSON, type CommentThreadContext, type CommentThreadDataJSON, type CommentsAdapter, type AddCommentThreadEventData } from './comments/commentsrepository.js';
export { default as CommentThreadController } from './comments/ui/commentthreadcontroller.js';
export { default as Annotation, type AnnotationEscapeEvent } from './annotations/annotation.js';
export { default as Annotations } from './annotations/annotations.js';
export { default as AnnotationCollection } from './annotations/annotationcollection.js';
export { default as AnnotationsUIs, type AnnotationUI } from './annotations/annotationsuis.js';
export { default as EditorAnnotations } from './annotations/editorannotations.js';
export { default as InlineAnnotations } from './annotations/inlineannotations.js';
export { default as Sidebar } from './annotations/sidebar.js';
export { default as WideSidebar } from './annotations/widesidebar.js';
export { default as NarrowSidebar } from './annotations/narrowsidebar.js';
export { default as AnnotationView } from './annotations/view/annotationview.js';
export { default as BaseCommentView } from './comments/ui/view/basecommentview.js';
export { default as BaseCommentThreadView } from './comments/ui/view/basecommentthreadview.js';
export { default as CommentsListView } from './comments/ui/view/commentslistview.js';
export { default as CommentView } from './comments/ui/view/commentview.js';
export { default as CommentThreadView } from './comments/ui/view/commentthreadview.js';
export { default as CommentThreadInputView } from './comments/ui/view/commentthreadinputview.js';
export { default as CommentsArchive } from './comments/commentsarchive.js';
export { default as CommentsArchiveUI } from './comments/commentsarchiveui.js';
export type { CommentsConfig, SidebarConfig, CommentsClipboardCopyConfig, CommentThreadConfig } from './config.js';
export type { default as CommentsEditing } from './comments/commentsediting.js';
import './augmentation.js';
