/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { ListItemView } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import { UserView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
export default class PresenceDropdownListItemView extends ListItemView {
    userView: UserView;
    constructor(locale: Locale, user: User, isButton: boolean);
    /**
     * Focuses the list item.
     */
    focus(): void;
}
