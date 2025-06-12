/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module special-characters/specialcharacters
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { Typing } from 'ckeditor5/src/typing.js';
import { IconSpecialCharacters } from 'ckeditor5/src/icons.js';
import { ButtonView, MenuBarMenuListItemButtonView, DialogViewPosition, Dialog } from 'ckeditor5/src/ui.js';
import { CKEditorError } from 'ckeditor5/src/utils.js';
import CharacterGridView from './ui/charactergridview.js';
import CharacterInfoView from './ui/characterinfoview.js';
import SpecialCharactersView from './ui/specialcharactersview.js';
import '../theme/specialcharacters.css';
import SpecialCharactersCategoriesView from './ui/specialcharacterscategoriesview.js';
const ALL_SPECIAL_CHARACTERS_GROUP = 'All';
/**
 * The special characters feature.
 *
 * Introduces the `'specialCharacters'` dropdown.
 */
export default class SpecialCharacters extends Plugin {
    /**
     * Registered characters. A pair of a character name and its symbol.
     */
    _characters;
    /**
     * Registered groups. Each group contains a displayed label and a collection with symbol names.
     */
    _groups;
    /**
     * A label describing the "All" special characters category.
     */
    _allSpecialCharactersGroupLabel;
    /**
     * @inheritDoc
     */
    static get requires() {
        return [Typing, Dialog];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SpecialCharacters';
    }
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin() {
        return true;
    }
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        const t = editor.t;
        this._characters = new Map();
        this._groups = new Map();
        this._allSpecialCharactersGroupLabel = t('All');
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add('specialCharacters', () => {
            const button = this._createDialogButton(ButtonView);
            button.set({
                tooltip: true
            });
            return button;
        });
        editor.ui.componentFactory.add('menuBar:specialCharacters', () => {
            return this._createDialogButton(MenuBarMenuListItemButtonView);
        });
    }
    /**
     * Adds a collection of special characters to the specified group. The title of a special character must be unique.
     *
     * **Note:** The "All" category name is reserved by the plugin and cannot be used as a new name for a special
     * characters category.
     */
    addItems(groupName, items, options = { label: groupName }) {
        if (groupName === ALL_SPECIAL_CHARACTERS_GROUP) {
            /**
             * The name "All" for a special category group cannot be used because it is a special category that displays all
             * available special characters.
             *
             * @error special-character-invalid-group-name
             */
            throw new CKEditorError('special-character-invalid-group-name', null);
        }
        const group = this._getGroup(groupName, options.label);
        for (const item of items) {
            group.items.add(item.title);
            this._characters.set(item.title, item.character);
        }
    }
    /**
     * Returns special character groups in an order determined based on configuration and registration sequence.
     */
    getGroups() {
        const groups = Array.from(this._groups.keys());
        const order = this.editor.config.get('specialCharacters.order') || [];
        const invalidGroup = order.find(item => !groups.includes(item));
        if (invalidGroup) {
            /**
             * One of the special character groups in the "specialCharacters.order" configuration doesn't exist.
             *
             * @error special-character-invalid-order-group-name
             */
            throw new CKEditorError('special-character-invalid-order-group-name', null, { invalidGroup });
        }
        return new Set([
            ...order,
            ...groups
        ]);
    }
    /**
     * Returns a collection of special characters symbol names (titles).
     */
    getCharactersForGroup(groupName) {
        if (groupName === ALL_SPECIAL_CHARACTERS_GROUP) {
            return new Set(this._characters.keys());
        }
        const group = this._groups.get(groupName);
        if (group) {
            return group.items;
        }
    }
    /**
     * Returns the symbol of a special character for the specified name. If the special character could not be found, `undefined`
     * is returned.
     *
     * @param title The title of a special character.
     */
    getCharacter(title) {
        return this._characters.get(title);
    }
    /**
     * Returns a group of special characters. If the group with the specified name does not exist, it will be created.
     *
     * @param groupName The name of the group to create.
     * @param label The label describing the new group.
     */
    _getGroup(groupName, label) {
        if (!this._groups.has(groupName)) {
            this._groups.set(groupName, {
                items: new Set(),
                label
            });
        }
        return this._groups.get(groupName);
    }
    /**
     * Updates the symbol grid depending on the currently selected character group.
     */
    _updateGrid(currentGroupName, gridView) {
        // Updating the grid starts with removing all tiles belonging to the old group.
        gridView.tiles.clear();
        const characterTitles = this.getCharactersForGroup(currentGroupName);
        for (const title of characterTitles) {
            const character = this.getCharacter(title);
            gridView.tiles.add(gridView.createTile(character, title));
        }
    }
    /**
     * Initializes the dropdown, used for lazy loading.
     *
     * @returns An object with `categoriesView`, `gridView` and `infoView` properties, containing UI parts.
     */
    _createDropdownPanelContent(locale) {
        const groupEntries = Array
            .from(this.getGroups())
            .map(name => ([name, this._groups.get(name).label]));
        // The map contains a name of category (an identifier) and its label (a translational string).
        const specialCharsGroups = new Map([
            // Add a special group that shows all available special characters.
            [ALL_SPECIAL_CHARACTERS_GROUP, this._allSpecialCharactersGroupLabel],
            ...groupEntries
        ]);
        const categoriesView = new SpecialCharactersCategoriesView(locale, specialCharsGroups);
        const gridView = new CharacterGridView(locale);
        const infoView = new CharacterInfoView(locale);
        gridView.on('tileHover', (evt, data) => {
            infoView.set(data);
        });
        gridView.on('tileFocus', (evt, data) => {
            infoView.set(data);
        });
        // Update the grid of special characters when a user changed the character group.
        categoriesView.on('change:currentGroupName', (evt, propertyName, newValue) => {
            this._updateGrid(newValue, gridView);
        });
        // Set the initial content of the special characters grid.
        this._updateGrid(categoriesView.currentGroupName, gridView);
        return { categoriesView, gridView, infoView };
    }
    /**
     * Creates a button for toolbar and menu bar that will show special characters dialog.
     */
    _createDialogButton(ButtonClass) {
        const editor = this.editor;
        const locale = editor.locale;
        const buttonView = new ButtonClass(editor.locale);
        const command = editor.commands.get('insertText');
        const t = locale.t;
        const dialogPlugin = this.editor.plugins.get('Dialog');
        buttonView.set({
            label: t('Special characters'),
            icon: IconSpecialCharacters,
            isToggleable: true
        });
        buttonView.bind('isOn').to(dialogPlugin, 'id', id => id === 'specialCharacters');
        buttonView.bind('isEnabled').to(command, 'isEnabled');
        buttonView.on('execute', () => {
            if (dialogPlugin.id === 'specialCharacters') {
                dialogPlugin.hide();
                return;
            }
            this._showDialog();
        });
        return buttonView;
    }
    _showDialog() {
        const editor = this.editor;
        const dialog = editor.plugins.get('Dialog');
        const locale = editor.locale;
        const t = locale.t;
        const { categoriesView, gridView, infoView } = this._createDropdownPanelContent(locale);
        const content = new SpecialCharactersView(locale, categoriesView, gridView, infoView);
        gridView.on('execute', (evt, data) => {
            editor.execute('insertText', { text: data.character });
        });
        dialog.show({
            id: 'specialCharacters',
            title: t('Special characters'),
            className: 'ck-special-characters',
            content,
            position: DialogViewPosition.EDITOR_TOP_SIDE
        });
    }
}
