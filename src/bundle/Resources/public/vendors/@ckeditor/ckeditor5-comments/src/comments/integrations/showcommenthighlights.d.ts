/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/integrations/showcommenthighlights
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * Provides integrations for getting editor data with `showCommentHightlights` option enabled for the features that need it.
 * Some of them are similar or duplicates from the `showSuggestionHighlights` option handling in the track changes feature.
 * Unfortunately, for now there's no single place where they could be shared and reused, so both plugins have to add them separately.
 */
export default class ShowCommentHighlights extends Plugin {
    /**
     * @inheritDoc
     */
    init(): void;
}
