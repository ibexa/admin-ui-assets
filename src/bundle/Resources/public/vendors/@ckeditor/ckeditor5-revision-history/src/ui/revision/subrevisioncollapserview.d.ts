/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/ui/revision/subrevisioncollapserview
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/revision/subrevisioncollapser.css';
export default class SubrevisionCollapserView extends View {
    /**
     * @observable
     */
    isVisible: boolean;
    constructor(locale: Locale);
    /**
     * TODO
     */
    toggle(): void;
}
