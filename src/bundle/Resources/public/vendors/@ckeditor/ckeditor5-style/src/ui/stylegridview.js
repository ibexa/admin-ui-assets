/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module style/ui/stylegridview
 */
import { View, addKeyboardHandlingForGrid } from 'ckeditor5/src/ui.js';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils.js';
import StyleGridButtonView from './stylegridbuttonview.js';
import '../../theme/stylegrid.css';
/**
 * A class representing a grid of styles ({@link module:style/ui/stylegridbuttonview~StyleGridButtonView buttons}).
 * Allows users to select a style.
 */
export default class StyleGridView extends View {
    /**
     * Tracks information about the DOM focus in the view.
     */
    focusTracker;
    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    keystrokes;
    /**
     * A collection of style {@link module:style/ui/stylegridbuttonview~StyleGridButtonView buttons}.
     */
    children;
    /**
     * Creates an instance of the {@link module:style/ui/stylegridview~StyleGridView} class.
     *
     * @param locale The localization services instance.
     * @param styleDefinitions Definitions of the styles.
     */
    constructor(locale, styleDefinitions) {
        super(locale);
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this.set('activeStyles', []);
        this.set('enabledStyles', []);
        this.children = this.createCollection();
        this.children.delegate('execute').to(this);
        for (const definition of styleDefinitions) {
            const gridTileView = new StyleGridButtonView(locale, definition);
            this.children.add(gridTileView);
        }
        this.on('change:activeStyles', () => {
            for (const child of this.children) {
                child.isOn = this.activeStyles.includes(child.styleDefinition.name);
            }
        });
        this.on('change:enabledStyles', () => {
            for (const child of this.children) {
                child.isEnabled = this.enabledStyles.includes(child.styleDefinition.name);
            }
        });
        this.setTemplate({
            tag: 'div',
            attributes: {
                class: [
                    'ck',
                    'ck-style-grid'
                ],
                role: 'listbox'
            },
            children: this.children
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        for (const child of this.children) {
            this.focusTracker.add(child.element);
        }
        addKeyboardHandlingForGrid({
            keystrokeHandler: this.keystrokes,
            focusTracker: this.focusTracker,
            gridItems: this.children,
            numberOfColumns: 3,
            uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
        });
        // Start listening for the keystrokes coming from the grid view.
        this.keystrokes.listenTo(this.element);
    }
    /**
     * Focuses the first style button in the grid.
     */
    focus() {
        this.children.first.focus();
    }
    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
}
