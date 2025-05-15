/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { View } from 'ckeditor5/src/ui.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import { UserView, type User } from 'ckeditor5-collaboration/src/collaboration-core.js';
export default class PresenceInlineListItemView extends View {
    isFocusable: boolean;
    hasTooltip: boolean;
    tooltipPosition: string;
    userView: UserView;
    markerView: MarkerView;
    constructor(locale: Locale, user: User, isButton: boolean);
}
declare class MarkerView extends View {
    constructor(locale: Locale, user: User);
}
export {};
