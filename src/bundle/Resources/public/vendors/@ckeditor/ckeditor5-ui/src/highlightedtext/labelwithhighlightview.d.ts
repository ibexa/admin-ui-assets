/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module ui/highlightedtext/labelwithhighlightview
 */
import HighlightedTextView from './highlightedtextview.js';
import type LabelView from '../label/labelview.js';
/**
 * A label view that can highlight a text fragment.
 */
export default class LabelWithHighlightView extends HighlightedTextView implements LabelView {
    /**
     * @inheritDoc
     */
    readonly id: string;
    /**
     * @inheritDoc
     */
    for: string | undefined;
    /**
     * @inheritDoc
     */
    constructor();
}
