/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { View, type FocusableView, type ViewCollection } from 'ckeditor5/src/ui.js';
import type PresenceInlineListItemView from './presenceinlinelistitemview.js';
import type PresenceCounterView from './presencecounterview.js';
import { KeystrokeHandler, type Locale } from 'ckeditor5/src/utils.js';
export default class PresenceInlineListView extends View implements FocusableView {
    /**
     * The collection of `PresenceInlineListItemView` instances.
     */
    readonly items: ViewCollection<PresenceInlineListItemView | PresenceCounterView>;
    /**
     * The keystroke handler for the presence inline list view.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Indicates whether the element has popup.
     */
    hasPopup: boolean;
    /**
     * Indicates whether the presence inline list view is expanded or not.
     */
    isExpanded: boolean;
    constructor(locale: Locale);
    /**
     * @inheritDoc
     */
    focus(): void;
    /**
     * @inheritDoc
     */
    render(): void;
}
