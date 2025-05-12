/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/ui/view/trackchangespreviewview
 * @publicApi
 */
import { View } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
/**
 * The view that displays the preview of the final content where all the suggestions are accepted.
 */
export default class TrackChangesPreviewView extends View {
    /**
     * The options for the preview dialog.
     */
    options: {
        dialogRects: {
            width: number;
            height: number;
        };
    };
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, options: {
        dialogRects: {
            width: number;
            height: number;
        };
    });
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Sets the data to be displayed in the preview.
     */
    setPreviewData(data: Array<[string, {
        classes: string;
        content: string;
    }]>, callback: (container: HTMLElement, elements: Array<HTMLElement>) => void): void;
    /**
     * @inheritDoc
     */
    focus(): void;
}
