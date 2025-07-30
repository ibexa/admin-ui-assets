/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module special-characters/ui/specialcharactersnavigationview
 */
import { type Locale } from 'ckeditor5/src/utils';
import { FormHeaderView, type DropdownView } from 'ckeditor5/src/ui';
/**
 * A class representing the navigation part of the special characters UI. It is responsible
 * for describing the feature and allowing the user to select a particular character group.
 */
export default class SpecialCharactersNavigationView extends FormHeaderView {
    /**
     * A dropdown that allows selecting a group of special characters to be displayed.
     */
    groupDropdownView: GroupDropdownView;
    /**
     * Creates an instance of the {@link module:special-characters/ui/specialcharactersnavigationview~SpecialCharactersNavigationView}
     * class.
     *
     * @param locale The localization services instance.
     * @param groupNames The names of the character groups and their displayed labels.
     */
    constructor(locale: Locale, groupNames: GroupNames);
    /**
     * Returns the name of the character group currently selected in the {@link #groupDropdownView}.
     */
    get currentGroupName(): string;
    /**
     * Focuses the character categories dropdown.
     */
    focus(): void;
    /**
     * Returns a dropdown that allows selecting character groups.
     *
     * @param groupNames The names of the character groups and their displayed labels.
     */
    private _createGroupDropdown;
    /**
     * Returns list item definitions to be used in the character group dropdown
     * representing specific character groups.
     *
     * @param dropdown Dropdown view element
     * @param groupNames The names of the character groups and their displayed labels.
     */
    private _getCharacterGroupListItemDefinitions;
}
/**
 * The names of the character groups and their displayed labels.
 */
export type GroupNames = Map<string, string>;
/**
 * `DropdownView` with additional field for the name of the currectly selected character group.
 */
export type GroupDropdownView = DropdownView & {
    value: string;
};
