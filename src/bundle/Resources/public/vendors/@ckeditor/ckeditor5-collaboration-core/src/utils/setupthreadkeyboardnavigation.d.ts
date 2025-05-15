/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import type { BaseCommentThreadView } from '@ckeditor/ckeditor5-comments';
import type { BaseSuggestionThreadView } from '@ckeditor/ckeditor5-track-changes';
/**
 * A keystroke used to move focus from the editor content to a current annotation that has a marker
 * under user's selection.
 */
export declare const FOCUS_ANNOTATION_KEYSTROKE: "Ctrl+Shift+E";
/**
 * This helper initializes focus navigation within a thread using a keyboard.
 *
 * * It takes care of added and removed (dynamic) views in the thread.
 * * It takes care of the Enter key support (entering a thread).
 * * It takes care of the Esc key support (leaving a thread or whole sidebar).
 * * It takes care of the arrow key events being fired for the sidebar to navigate between individual threads.
 *
 * @param threadView A thread view in which the keyboard navigation will be enabled.
 * @param focusCycleableViews A collection of focusable views withing a thread.
 */
export default function setupThreadKeyboardNavigation(threadView: BaseCommentThreadView | BaseSuggestionThreadView, focusCycleableViews: ViewCollection<FocusableView>): void;
/**
 * An event fired when the user presses the Esc key while the entire thread is focused.
 */
export type ThreadEscapeEvent = {
    name: 'escape';
    args: [];
};
/**
 * An event fired when the user presses the arrow up key while the entire thread is focused.
 */
export type ThreadArrowUpEvent = {
    name: 'arrowup';
    args: [];
};
/**
 * An event fired when the user presses the arrow down key while the entire thread is focused.
 */
export type ThreadArrowDownEvent = {
    name: 'arrowdown';
    args: [];
};
