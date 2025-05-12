/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/view/annotationcounterbuttonview
 * @publicApi
 */
import { ButtonView, View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
/**
 * A view used in the sidebar by {@link module:comments/annotations/narrowsidebar~NarrowSidebar}.
 */
export default class AnnotationCounterButtonView extends ButtonView {
    /**
     * @observable
     */
    isDirty: boolean;
    /**
     * @observable
     */
    number: number;
    /**
     * @observable
     */
    annotationType: string;
    counterView: View;
    constructor(locale: Locale);
}
