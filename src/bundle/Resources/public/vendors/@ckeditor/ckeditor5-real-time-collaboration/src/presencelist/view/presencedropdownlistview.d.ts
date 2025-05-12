/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/presencelist/view/presencedropdownlistview
 * @publicApi
 */
import { ListView, View } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
/**
 * `PresenceDropdownListView` is a view that represents the dropdown variant of users list.
 *
 *  It is displayed when the user count is equal to or greater than the value specified in
 *  {@link module:real-time-collaboration/config~PresenceListConfig#collapseAt `config.presenceList.collapseAt`}.
 */
export default class PresenceDropdownListView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, isButtonsList?: boolean);
}
/**
 * Wrapper view for the presence dropdown list.
 */
export declare class PresenceDropdownListWrapperView extends ListView {
    constructor(locale: Locale, isButtonsList?: boolean);
    /**
     * @inheritDoc
     */
    render(): void;
}
