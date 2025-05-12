/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/annotations/view/sidebarview
 * @publicApi
 */
import { View, FocusCycler, type ViewCollection, type ViewWithFocusCycler } from 'ckeditor5/src/ui.js';
import { FocusTracker, type Locale } from 'ckeditor5/src/utils.js';
import type SidebarItemView from './sidebaritemview.js';
import '../../../theme/sidebar.css';
/**
 * The sidebar view class that displays the collection of sidebar item views.
 */
export default class SidebarView extends View implements ViewWithFocusCycler {
    /**
     * @observable
     */
    minHeight: number | null;
    /**
     * @observable
     */
    class: string;
    /**
     * A collection of sidebar item views.
     */
    list: ViewCollection<SidebarItemView>;
    /**
     * A collection of focusable views in the sidebar.
     */
    focusables: ViewCollection<SidebarItemView>;
    /**
     * Tracks information about DOM focus among sidebar item views.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Helps cycling over {@link #focusables focusable items} in the sidebar.
     */
    readonly focusCycler: FocusCycler;
    /**
     * @inheritDoc
     */
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
