/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module special-characters/ui/specialcharactersnavigationview
 */
import { Collection } from 'ckeditor5/src/utils';
import { addListToDropdown, createDropdown, Model, FormHeaderView } from 'ckeditor5/src/ui';
/**
 * A class representing the navigation part of the special characters UI. It is responsible
 * for describing the feature and allowing the user to select a particular character group.
 */
export default class SpecialCharactersNavigationView extends FormHeaderView {
    /**
     * Creates an instance of the {@link module:special-characters/ui/specialcharactersnavigationview~SpecialCharactersNavigationView}
     * class.
     *
     * @param locale The localization services instance.
     * @param groupNames The names of the character groups and their displayed labels.
     */
    constructor(locale, groupNames) {
        super(locale);
        const t = locale.t;
        this.set('class', 'ck-special-characters-navigation');
        this.groupDropdownView = this._createGroupDropdown(groupNames);
        this.groupDropdownView.panelPosition = locale.uiLanguageDirection === 'rtl' ? 'se' : 'sw';
        this.label = t('Special characters');
        this.children.add(this.groupDropdownView);
    }
    /**
     * Returns the name of the character group currently selected in the {@link #groupDropdownView}.
     */
    get currentGroupName() {
        return this.groupDropdownView.value;
    }
    /**
     * Focuses the character categories dropdown.
     */
    focus() {
        this.groupDropdownView.focus();
    }
    /**
     * Returns a dropdown that allows selecting character groups.
     *
     * @param groupNames The names of the character groups and their displayed labels.
     */
    _createGroupDropdown(groupNames) {
        const locale = this.locale;
        const t = locale.t;
        const dropdown = createDropdown(locale);
        const groupDefinitions = this._getCharacterGroupListItemDefinitions(dropdown, groupNames);
        const accessibleLabel = t('Character categories');
        dropdown.set('value', groupDefinitions.first.model.name);
        dropdown.buttonView.bind('label').to(dropdown, 'value', value => groupNames.get(value));
        dropdown.buttonView.set({
            isOn: false,
            withText: true,
            tooltip: accessibleLabel,
            class: ['ck-dropdown__button_label-width_auto'],
            ariaLabel: accessibleLabel,
            ariaLabelledBy: undefined
        });
        dropdown.on('execute', evt => {
            dropdown.value = evt.source.name;
        });
        dropdown.delegate('execute').to(this);
        addListToDropdown(dropdown, groupDefinitions, {
            ariaLabel: accessibleLabel,
            role: 'menu'
        });
        return dropdown;
    }
    /**
     * Returns list item definitions to be used in the character group dropdown
     * representing specific character groups.
     *
     * @param dropdown Dropdown view element
     * @param groupNames The names of the character groups and their displayed labels.
     */
    _getCharacterGroupListItemDefinitions(dropdown, groupNames) {
        const groupDefs = new Collection();
        for (const [name, label] of groupNames) {
            const model = new Model({
                name,
                label,
                withText: true,
                role: 'menuitemradio'
            });
            model.bind('isOn').to(dropdown, 'value', value => value === model.name);
            groupDefs.add({ type: 'button', model });
        }
        return groupDefs;
    }
}
