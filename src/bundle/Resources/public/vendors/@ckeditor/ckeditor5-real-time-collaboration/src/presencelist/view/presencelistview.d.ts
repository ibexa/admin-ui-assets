/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module real-time-collaboration/presencelist/view/presencelistview
 * @publicApi
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import '../../../theme/presencelist.css';
/**
 * `PresenceListView` is the default view for the presence list. It shows the inline list of users, and an optional user counter.
 */
export default class PresenceListView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale: Locale, collapseAt?: number);
}
