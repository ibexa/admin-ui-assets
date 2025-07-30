/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module special-characters/ui/charactergridview
 */
import { View, ButtonView, type ViewCollection } from 'ckeditor5/src/ui';
import { KeystrokeHandler, FocusTracker, type Locale } from 'ckeditor5/src/utils';
import '../../theme/charactergrid.css';
/**
 * A grid of character tiles. It allows browsing special characters and selecting the character to
 * be inserted into the content.
 */
export default class CharacterGridView extends View<HTMLDivElement> {
    /**
     * A collection of the child tile views. Each tile represents a particular character.
     */
    readonly tiles: ViewCollection<ButtonView>;
    /**
     * Tracks information about the DOM focus in the grid.
     */
    readonly focusTracker: FocusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Creates an instance of a character grid containing tiles representing special characters.
     *
     * @param locale The localization services instance.
     */
    constructor(locale: Locale);
    /**
     * Creates a new tile for the grid.
     *
     * @param character A human-readable character displayed as the label (e.g. "ε").
     * @param name The name of the character (e.g. "greek small letter epsilon").
     */
    createTile(character: string, name: string): ButtonView;
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Focuses the first focusable in {@link ~CharacterGridView#tiles}.
     */
    focus(): void;
}
/**
 * Fired when any of {@link ~CharacterGridView#tiles grid tiles} is clicked.
 *
 * @eventName ~CharacterGridView#execute
 * @param data Additional information about the event.
 */
export type CharacterGridViewExecuteEvent = {
    name: 'execute';
    args: [data: CharacterGridViewEventData];
};
/**
 * Fired when a mouse or another pointing device caused the cursor to move onto any {@link ~CharacterGridView#tiles grid tile}
 * (similar to the native `mouseover` DOM event).
 *
 * @eventName ~CharacterGridView#tileHover
 * @param data Additional information about the event.
 */
export type CharacterGridViewTileHoverEvent = {
    name: 'tileHover';
    args: [data: CharacterGridViewEventData];
};
/**
 * Fired when {@link ~CharacterGridView#tiles grid tile} is focused (e.g. by navigating with arrow keys).
 *
 * @eventName ~CharacterGridView#tileFocus
 * @param data Additional information about the event.
 */
export type CharacterGridViewTileFocusEvent = {
    name: 'tileFocus';
    args: [data: CharacterGridViewEventData];
};
export interface CharacterGridViewEventData {
    /**
     * The name of the tile that caused the event (e.g. "greek small letter epsilon").
     */
    name: string;
    /**
     * A human-readable character displayed as the label (e.g. "ε").
     */
    character: string;
}
