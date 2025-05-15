/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { Editor } from 'ckeditor5/src/core.js';
import type Suggestion from '../suggestion.js';
import type { default as BaseSuggestionThreadView } from './view/basesuggestionthreadview.js';
import type { CommentThreadController } from '@ckeditor/ckeditor5-comments';
declare const SuggestionController_base: {
    new (): import("ckeditor5/src/utils.js").Observable;
    prototype: import("ckeditor5/src/utils.js").Observable;
};
/**
 * A controller for a suggestion.
 *
 * It takes a suggestion thread view, listens to events fired by that view and based on them performs actions
 * on the provided suggestion model.
 */
export default class SuggestionController extends /* #__PURE__ -- @preserve */ SuggestionController_base {
    model: Suggestion;
    view: BaseSuggestionThreadView;
    commentThreadController: CommentThreadController;
    constructor(editor: Editor, model: Suggestion, view: BaseSuggestionThreadView, commentThreadController: CommentThreadController);
    /**
     * Accepts the suggestion that belongs to this controller.
     */
    acceptSuggestion(): void;
    /**
     * Discards the suggestion that belongs to this controller.
     */
    discardSuggestion(): void;
    /**
     * Destroys `SuggestionController` instance.
     */
    destroy(): void;
}
export {};
