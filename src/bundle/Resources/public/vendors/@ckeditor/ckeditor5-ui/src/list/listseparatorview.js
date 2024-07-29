/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/list/listseparatorview
 */
import View from '../view';
/**
 * The list separator view class.
 */
export default class ListSeparatorView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        this.setTemplate({
            tag: 'li',
            attributes: {
                class: [
                    'ck',
                    'ck-list__separator'
                ]
            }
        });
    }
}
