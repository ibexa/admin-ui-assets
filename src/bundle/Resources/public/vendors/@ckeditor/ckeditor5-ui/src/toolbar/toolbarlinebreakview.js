/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module ui/toolbar/toolbarlinebreakview
 */
import View from '../view.js';
/**
 * The toolbar line break view class.
 */
export default class ToolbarLineBreakView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        this.setTemplate({
            tag: 'span',
            attributes: {
                class: [
                    'ck',
                    'ck-toolbar__line-break'
                ]
            }
        });
    }
}
