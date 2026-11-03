/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Insert HTML":"Въведи HTML","HTML snippet":"съкратен HTML","Paste raw HTML here...":"Постави суров HTML тук...","Edit source":"Редактирай източник","Save changes":"Запази промените","No preview available":"Не е наличен преглед","Empty snippet content":"Изпразни съдържанието на съкращението"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
