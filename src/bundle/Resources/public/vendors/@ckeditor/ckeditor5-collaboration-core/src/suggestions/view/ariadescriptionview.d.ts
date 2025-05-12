/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module collaboration-core/suggestions/view/ariadescriptionview
 * @publicApi
 */
import { type Locale } from 'ckeditor5/src/utils.js';
import { View } from 'ckeditor5/src/ui.js';
/**
 * The view class (container) for a text referenced by a `aria-describedby` attribute.
 */
export default class AriaDescriptionView extends View {
    readonly id: string;
    /**
     * Creates an instance of `AriaDescriptionView`.
     *
     * @param locale Locale instance.
     * @param description Plaintext description of the element.
     */
    constructor(locale: Locale, description: string);
}
