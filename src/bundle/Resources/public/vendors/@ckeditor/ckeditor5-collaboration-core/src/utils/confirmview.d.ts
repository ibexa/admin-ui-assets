/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { View, type FocusableView } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
export default class ConfirmView extends View implements FocusableView {
    message: string;
    constructor(locale: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    focus(): void;
}
export type ConfirmViewCancelEvent = {
    name: 'cancel';
    args: [];
};
export type ConfirmViewSubmitEvent = {
    name: 'submit';
    args: [];
};
