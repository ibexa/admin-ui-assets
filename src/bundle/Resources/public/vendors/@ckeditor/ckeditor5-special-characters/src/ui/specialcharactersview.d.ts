/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module special-characters/ui/specialcharactersview
 */
import { View, FocusCycler, type ViewCollection } from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler, type Locale } from 'ckeditor5/src/utils';
import type CharacterGridView from './charactergridview';
import type CharacterInfoView from './characterinfoview';
import type SpecialCharactersNavigationView from './specialcharactersnavigationview';
/**
 * A view that glues pieces of the special characters dropdown panel together:
 *
 * * the navigation view (allows selecting the category),
 * * the grid view (displays characters as a grid),
 * * and the info view (displays detailed info about a specific character).
 */
export default class SpecialCharactersView extends View<HTMLDivElement> {
    /**
     * A collection of the focusable children of the view.
     */
    readonly items: ViewCollection;
    /**
     * Tracks information about the DOM focus in the view.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Helps cycling over focusable {@link #items} in the view.
     */
    protected readonly _focusCycler: FocusCycler;
    /**
     * An instance of the `SpecialCharactersNavigationView`.
     */
    navigationView: SpecialCharactersNavigationView;
    /**
     * An instance of the `CharacterGridView`.
     */
    gridView: CharacterGridView;
    /**
     * An instance of the `CharacterInfoView`.
     */
    infoView: CharacterInfoView;
    /**
     * Creates an instance of the `SpecialCharactersView`.
     */
    constructor(locale: Locale, navigationView: SpecialCharactersNavigationView, gridView: CharacterGridView, infoView: CharacterInfoView);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Focuses the first focusable in {@link #items}.
     */
    focus(): void;
}
